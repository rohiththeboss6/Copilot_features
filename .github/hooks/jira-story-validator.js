#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const WORKSPACE_ROOT = process.cwd();
const TITLE_REGEX = /^##\s\[([A-Z][A-Z0-9]+-\d+)\]\s.+$/;
const STORY_OUTPUT_REGEX = /(?:^|[\\/])[^\\/]+_user_stories\.md$/i;

function readStdinJson() {
  try {
    const input = fs.readFileSync(0, "utf8").trim();
    return input ? JSON.parse(input) : {};
  } catch {
    return {};
  }
}

function collectStrings(value, output) {
  if (typeof value === "string") {
    output.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, output);
    }
    return;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      collectStrings(value[key], output);
    }
  }
}

function collectMarkdownPaths(payload) {
  const strings = [];
  collectStrings(payload, strings);

  const paths = new Set();
  for (const entry of strings) {
    if (!STORY_OUTPUT_REGEX.test(entry)) {
      continue;
    }

    const normalized = path.isAbsolute(entry) ? entry : path.resolve(WORKSPACE_ROOT, entry);
    paths.add(normalized);
  }

  return [...paths];
}

function shouldValidate(payload) {
  return collectMarkdownPaths(payload).length > 0;
}

function validateStoryTitles(filePath) {
  if (!fs.existsSync(filePath)) {
    return { ok: true, violations: [] };
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const storyHeadings = lines
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter((entry) => entry.line.startsWith("## "));

  const violations = storyHeadings
    .filter((entry) => !TITLE_REGEX.test(entry.line))
    .map((entry) => `Line ${entry.lineNumber}: ${entry.line}`);

  return {
    ok: violations.length === 0,
    violations,
  };
}

function printAllow() {
  process.stdout.write(
    JSON.stringify({
      continue: true,
      systemMessage: "JIRA story title validation passed.",
    })
  );
}

function printBlock(violations) {
  const message = [
    "JIRA story title validation failed for one or more generated story markdown files.",
    "Expected format: ## [PROJ-123] Story title",
    "Violations:",
    ...violations,
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      continue: false,
      stopReason: message,
      systemMessage: message,
      decision: "block",
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        decision: "block",
        reason: message,
      },
    })
  );
}

function main() {
  const payload = readStdinJson();
  const markdownPaths = collectMarkdownPaths(payload);

  if (markdownPaths.length === 0) {
    printAllow();
    process.exit(0);
  }

  const violations = [];
  for (const markdownPath of markdownPaths) {
    const result = validateStoryTitles(markdownPath);
    if (!result.ok) {
      violations.push(...result.violations.map((violation) => `${path.relative(WORKSPACE_ROOT, markdownPath)}: ${violation}`));
    }
  }

  if (violations.length === 0) {
    printAllow();
    process.exit(0);
  }

  printBlock(violations);
  process.exit(2);
}

main();
