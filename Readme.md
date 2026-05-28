Tasks:

As a BA, create user-story-generator agent which will generate user stories for this EPIC @udemy_epic.txt.

1. The agent should be generic means not specific for udemy registration epic.
2. Use skills to help agent educate about the domain and story creation
3. Use Instructions and prompts
4. Use hooks to check about the JIRA story name pattern. 

Implementation Status:

- Completed workspace agent package for generic epic to user story generation.
- Added skill, instructions, prompt template, and hook-based JIRA title validation.
- Generated output from `udemy_epic.txt` in `registeration_user_stories.md`.

How to use:

1. Open chat and select the `User Story Generator` custom agent.
2. Provide epic content (or reference `udemy_epic.txt`) and a project key (example: PROJ).
3. Ask the agent to generate output to `registeration_user_stories.md`.
4. Ensure each story heading follows `[PROJ-123] Story title`.
5. If the hook reports a violation, fix the heading pattern and regenerate.

Files added:

- `.github/agents/user-story-generator.agent.md`
- `.github/AGENTS.md`
- `.github/skills/user-story-creation/SKILL.md`
- `.github/instructions/user-story-generator.instructions.md`
- `.github/prompts/generate-user-stories.prompt.md`
- `.github/hooks/jira-story-validator.js`
- `.github/hooks/hooks.config.json`
- `registeration_user_stories.md`


