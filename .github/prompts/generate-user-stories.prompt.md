---
name: Generate User Stories
description: "Generate user stories from an epic with JIRA-compliant story titles and markdown output."
argument-hint: "Epic file path/text, project key, output file name"
agent: user-story-generator
---

Generate user stories from the provided epic.

Inputs:
- Epic source: {{epic_source}}
- Project key: {{project_key}}
- Output file: {{output_file}}
- Quality mode: {{quality_mode: specific}}

Requirements:
- Use heading format: `## [{{project_key}}-<number>] Story title`.
- Include `User Story`, `Acceptance Criteria`, and `Definition of Done` sections per story.
- Ensure all epic acceptance criteria are fully covered with no duplication.
- Keep stories implementation-agnostic and testable.
- Enforce specificity baseline when `quality_mode` is `specific`:
	- At least 4 acceptance criteria bullets per story
	- At least 1 negative-path criterion where relevant
	- Include examples where useful (input/message/status/event/boundary)
	- Definition of Done must be verifiable with evidence expectations
