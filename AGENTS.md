# Agent Guidelines

## Repository Purpose
This repository contains AI agent definitions (markdown files) for the kiogreo ecosystem. No source code to build/test.

## Build/Test Commands
- **Package manager**: `bun install` (only in `.opencode/` directory for OpenCode plugin dependencies)
- **No build/test/lint/format tools** - Documentation-only repository
- **No test runner** - Validation occurs through agent usage and peer review

## Agent Definition Standards
- **Location**: `.claude/agents/*.md` or `.opencode/agent/*.md`
- **Format**: Markdown with YAML frontmatter (name, description, tools, model, color required)
- **Structure**: Core responsibilities → Methodology → Interaction guidelines → Quality assurance
- **Examples**: Must include `<example>` tags in description showing usage scenarios
- **Design principles**: Self-contained, well-documented, prioritized objectives, actionable feedback

## Code Style (for future development)
- **Imports**: Group and order logically (stdlib → third-party → local)
- **Naming**: Use descriptive names; kebab-case for files, camelCase for variables
- **Types**: Prefer explicit types; use TypeScript when applicable
- **Error handling**: Provide specific, actionable error messages
- **Comments**: Focus on "why" not "what"; keep agents focused on single purpose

## Pull Request Guidelines
- Use templates in `.github/PULL_REQUEST_TEMPLATE/` (feature.md or bugfix.md)
- Verify: Readability → Maintainability → Performance (in priority order)
- Ensure agent definitions include concrete examples and quality assurance checklists
