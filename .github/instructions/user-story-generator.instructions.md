---
name: User Story Generator Instructions
description: "Use when generating user stories from epic inputs, validating story quality, and producing backlog-ready markdown output."
---

# User Story Generator Instructions

- Generate stories from epic outcomes, not from technical implementation tasks.
- Maintain title format exactly: `[PROJ-123] Story title`.
- Output each story with:
  - `##` story title
  - `### User Story`
  - `### Acceptance Criteria`
  - `### Definition of Done`
- Use clear and measurable acceptance criteria.
- Ensure complete coverage of epic acceptance criteria.
- Avoid duplicate stories and ambiguous ownership.
- If project key is missing, use `PROJ` placeholder.
- Default output file: `registeration_user_stories.md`.

## Reusable Quality Gates

- Each story should have at least 4 acceptance criteria bullets.
- At least one criterion should cover failure or invalid-path behavior where applicable.
- Prefer measurable wording (for example: expected response, message text, event name, threshold, boundary value).
- Add concrete examples where useful:
  - Input examples (valid and invalid)
  - Expected error/success messages
  - Status code examples
  - Event/log names and reason categories
- Definition of Done must be verifiable and include evidence expectations (test coverage, review sign-off, logs/events verification).
- Keep criteria implementation-agnostic while still specific enough for QA and engineering.

## Epic Coverage Check

- Before finalizing, validate every epic acceptance criterion is mapped to at least one generated story.
- Do not leave any epic criterion unaddressed.
