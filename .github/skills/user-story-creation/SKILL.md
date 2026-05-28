---
name: user-story-creation
description: 'Generate high-quality user stories from epics using INVEST principles, clear acceptance criteria, and definition of done. Use for BA story decomposition and refinement.'
argument-hint: 'Epic text or epic file path, project key, output file name'
user-invocable: true
---

# User Story Creation

## When To Use
- Decomposing an epic into multiple implementation-ready stories.
- Preparing backlog items for planning and refinement.
- Standardizing acceptance criteria quality across teams.

## Procedure
1. Extract actors, goals, constraints, and quality requirements from the epic.
2. Group requirements into independent value slices.
3. Write story statements in `As a / I want / So that` format.
4. Add measurable acceptance criteria for each story.
5. Add definition of done with quality and traceability checks.

## Quality Rules
- Follow INVEST where practical:
  - Independent
  - Negotiable
  - Valuable
  - Estimable
  - Small
  - Testable
- Keep stories free from low-level implementation specifics.
- Ensure no duplicate intent across stories.
- Ensure all original epic acceptance criteria are covered.

## Acceptance Criteria Style
- Use concise, testable bullets.
- Prefer observable behavior and validation outcomes.
- Include negative paths where relevant (invalid input, duplicates, failures).

## Specificity Pattern (Reusable Across Any Epic)
- Write criteria that QA can test without clarification.
- Include one or more concrete examples when the requirement involves validation or messaging.
- Use precise expected outcomes, such as:
  - Validation result examples
  - Error/success message examples
  - API/status examples where applicable
  - Event/log example names where applicable
- Keep acceptance criteria implementation-agnostic, but not vague.

## Reusable Story Checklist
1. Story outcome is independent and non-overlapping.
2. Acceptance criteria count is at least 4.
3. At least one negative-path criterion exists when relevant.
4. At least one concrete example is included when relevant.
5. Definition of Done includes testability and evidence.
6. Story traces back to one or more epic acceptance criteria.

## Definition Of Done Baseline
- Story acceptance criteria met and test evidence available.
- Error handling and user messaging included.
- Logging/analytics requirements implemented where defined.
- Documentation updated.

## Example Snippets (Domain-Agnostic)
- Validation example: `Invalid format shows inline message with correction guidance`.
- Boundary example: `Minimum threshold fails at N-1 and passes at N`.
- Event example: `Success emits <domain>_completed and failure emits <domain>_failed`.
