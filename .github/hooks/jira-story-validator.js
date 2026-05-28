#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const WORKSPACE_ROOT = process.cwd();
const TARGET_FILE = "registeration_user_stories.md";
const TITLE_REGEX = /^##\s\[([A-Z][A-Z0-9]+-\d+)\]\s.+$/;

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

function shouldValidate(payload) {
  const strings = [];
  collectStrings(payload, strings);
  return strings.some((s) => s.includes(TARGET_FILE));
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
    "JIRA story title validation failed for registeration_user_stories.md.",
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
  if (!shouldValidate(payload)) {
    printAllow();
    process.exit(0);
  }

  const outputPath = path.join(WORKSPACE_ROOT, TARGET_FILE);
  const result = validateStoryTitles(outputPath);

  if (result.ok) {
    printAllow();
    process.exit(0);
  }

  printBlock(result.violations);
  process.exit(2);
}

main();
