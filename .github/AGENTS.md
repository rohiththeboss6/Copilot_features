# Custom Agents

## User Story Generator
- File: `.github/agents/user-story-generator.agent.md`
- Use for: Converting epics into structured user stories.
- Requires: JIRA title format `[PROJ-123] Story title`.
- Default output: `registeration_user_stories.md`.
- Related assets:
  - `.github/skills/user-story-creation/SKILL.md`
  - `.github/instructions/user-story-generator.instructions.md`
  - `.github/prompts/generate-user-stories.prompt.md`
  - `.github/hooks/jira-story-validator.js`
