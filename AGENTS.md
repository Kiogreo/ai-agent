# Agent Guidelines

## Repository Context
**Purpose**: AI agent definitions & research documentation repository for Kiogreo ecosystem. Documentation-only - no traditional source code.
**Structure**: `.claude/agents/` (Claude agents), `.opencode/agent/` (OpenCode agents), `.output/` (temp AI outputs), `test/` (prototypes & WIP), `library/` (final research docs)
**Tech Stack**: OpenCode, Claude Code, other AI coding agents
**Config**: Default model `anthropic/claude-sonnet-4-5` in `opencode.jsonc`

## Build/Test Commands
- **Install**: `cd .opencode && bun install`
- **Build/Lint/Test**: None - this is a documentation repository
- **Single Test**: N/A - validation happens through agent execution in target environments
- **Verification**: Manual review + testing agents in real usage scenarios

## Agent Definition Standards
- **Location**: `.claude/agents/*.md` (Claude agents) or `.opencode/agent/*.md` (OpenCode agents)
- **Format**: Markdown with YAML frontmatter + agent instructions
- **Required YAML**: `description` (include usage examples), `mode: subagent`, optionally `tools` (dict of tool permissions)
- **Model**: Always use `anthropic/claude-sonnet-4-5` (configured in `opencode.jsonc`)
- **File Naming**: kebab-case (e.g., `doc-processor.md`, `readme-writer.md`)
- **Content Structure**: Agent role statement → Core Responsibilities → Output Structure → Quality Standards → Process Workflow
- **Usage Examples**: Include in YAML `description` field with User/Assistant dialogue format

## Code Style (for future TypeScript/JavaScript development)
- **Imports**: stdlib → third-party → local (grouped and ordered alphabetically within groups)
- **Naming**: kebab-case for files, camelCase for variables/functions, PascalCase for classes/types
- **Types**: Explicit TypeScript types preferred; avoid `any`
- **Error Handling**: Specific, actionable error messages with context
- **Comments**: Explain "why" not "what"; maintain single responsibility per agent/function

## Pull Request Guidelines
- **Template**: Use `.github/pull_request_template.md` (specify feature type: New Agent/Enhancement/Documentation/Infrastructure)
- **Agent Checklist**: Complete YAML frontmatter with examples, clear role definition, structured workflow
- **Review Priorities**: Clarity of purpose → Completeness → Usability → Consistency with existing agents
