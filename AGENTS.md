# Agent Guidelines

## Repository Context
**Purpose**: AI agent definitions & research documentation repository for Kiogreo ecosystem. Documentation-only - no traditional source code.
**Structure**: `.opencode/agent/` (agent definitions), `.output/` (temp AI outputs), `.lab/` (research WIP), `.library/` (final research docs)
**Tech Stack**: OpenCode, Claude Code, other AI coding agents

## Build/Test Commands
- **Install**: `bun install` (`.opencode/` directory only)
- **Build/Lint/Test**: None - this is a documentation repository
- **Single Test**: N/A - validation happens through agent execution in target environments
- **Verification**: Manual review + testing agents in real usage scenarios

## Agent Definition Standards
- **Location**: `.opencode/agent/*.md` (agents) or `.opencode/command/*.md` (commands)
- **Format**: Markdown with YAML frontmatter - see `.opencode/agent/technical-documentation-processor.md` for reference
- **Required YAML**: `name`, `description`, `model` (always use `anthropic/claude-sonnet-4-5`)
- **Optional YAML**: `identifier`, `mode: subagent`, `tools`, `permission` (ask/allow/deny)
- **File Naming**: kebab-case (e.g., `readme-writer.md`, `analyze-web-docs.md`)
- **Content Structure**: System Prompt → Instructions → Core Responsibilities → Strategy → Output Format → Guidelines
- **Examples**: Must include `<example>` tags demonstrating usage scenarios

## Code Style (for future TypeScript/JavaScript development)
- **Imports**: stdlib → third-party → local (grouped and ordered alphabetically within groups)
- **Naming**: kebab-case for files, camelCase for variables/functions, PascalCase for classes/types
- **Types**: Explicit TypeScript types preferred; avoid `any`
- **Error Handling**: Specific, actionable error messages with context
- **Comments**: Explain "why" not "what"; maintain single responsibility per agent/function

## Pull Request Guidelines
- **Templates**: Use `.github/PULL_REQUEST_TEMPLATE/feature.md` (new features) or `bugfix.md` (bug fixes)
- **Agent Checklist**: Complete YAML frontmatter, usage examples, clear objectives, QA section
- **Review Priorities**: Readability → Maintainability → Performance
