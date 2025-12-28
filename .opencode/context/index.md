# Context Files Index

This directory contains context files that provide project-specific standards, patterns, and knowledge for OpenAgents. These files are automatically loaded by agents during execution to ensure consistency and quality.

## Directory Structure

```
.opencode/context/
├── core/
│   ├── essential-patterns.md      # Universal coding patterns and principles
│   ├── standards/
│   │   ├── analysis.md            # Code analysis standards and practices
│   │   ├── code.md                # Core coding standards and conventions
│   │   ├── docs.md                # Documentation standards and guidelines
│   │   ├── patterns.md            # Design patterns and architectural guidelines
│   │   └── tests.md               # Testing standards and best practices
│   ├── system/
│   │   └── context-guide.md       # Guide for using context files effectively
│   └── workflows/
│       ├── delegation.md          # Agent delegation and task management workflows
│       ├── review.md              # Code review processes and standards
│       ├── sessions.md            # Session management and workflow tracking
│       └── task-breakdown.md      # Task decomposition and planning methodologies
└── project/
    └── project-context.md         # Project-specific context and domain knowledge
```

## Context File Categories

### Core Standards (`core/standards/`)
Essential coding standards that agents must follow:

- **[code.md](core/standards/code.md)**: Core coding standards, functional programming patterns, naming conventions
- **[docs.md](core/standards/docs.md)**: Documentation standards, tone, structure, and formatting
- **[tests.md](core/standards/tests.md)**: Testing standards, AAA pattern, coverage goals, mocking strategies
- **[patterns.md](core/standards/patterns.md)**: Design patterns, architectural guidelines, anti-patterns
- **[analysis.md](core/standards/analysis.md)**: Code analysis practices, debugging approaches, performance optimization

### Core Workflows (`core/workflows/`)
Process and workflow standards:

- **[delegation.md](core/workflows/delegation.md)**: Agent delegation rules, subagent selection, context passing
- **[review.md](core/workflows/review.md)**: Code review processes, quality gates, feedback mechanisms
- **[sessions.md](core/workflows/sessions.md)**: Session management, state tracking, workflow persistence
- **[task-breakdown.md](core/workflows/task-breakdown.md)**: Task decomposition, dependency mapping, planning methodologies

### Core System (`core/system/`)
System-level context and guides:

- **[essential-patterns.md](core/essential-patterns.md)**: Universal patterns applicable across all projects
- **[context-guide.md](core/system/context-guide.md)**: How to effectively use and maintain context files

### Project Context (`project/`)
Project-specific knowledge and domain context:

- **[project-context.md](project/project-context.md)**: Project-specific patterns, business logic, domain knowledge

## Agent Context Loading

Agents automatically load relevant context files based on task type:

| Task Type | Context Files Loaded |
|-----------|---------------------|
| Code tasks | `core/standards/code.md` |
| Documentation | `core/standards/docs.md` |
| Testing | `core/standards/tests.md` |
| Code review | `core/workflows/review.md` |
| Delegation | `core/workflows/delegation.md` |

## Context File Standards

All context files follow these standards:

### File Naming
- `kebab-case.md` (e.g., `code-standards.md`)
- Descriptive names that clearly indicate content

### Structure
- **Header**: Clear title and purpose
- **Quick Reference**: Key points and critical patterns
- **Detailed Sections**: Comprehensive guidelines
- **Examples**: Code examples and usage patterns
- **Best Practices**: Do's and don'ts

### Content Guidelines
- **Actionable**: Provide specific, implementable guidance
- **Comprehensive**: Cover all relevant aspects
- **Up-to-date**: Regularly reviewed and updated
- **Consistent**: Follow established patterns and tone

## Maintenance

### Adding New Context Files
1. Place in appropriate category directory
2. Follow naming conventions
3. Update this index file
4. Update agent references if needed
5. Test with relevant agents

### Updating Context Files
1. Maintain backward compatibility
2. Update version numbers and dates
3. Review impact on existing agents
4. Update this index if scope changes

### Version Control
- Include version and last-updated metadata
- Track changes in commit messages
- Review context file changes carefully

## Related Documentation

- [OpenAgent Core](../agent/core/openagent.md) - Main agent that uses these context files
- [OpenCoder](../agent/core/opencoder.md) - Development agent with context loading
- [AGENTS.md](../../AGENTS.md) - Agent guidelines and context loading references

---

**Last Updated**: 2025-12-28
**Version**: 1.0
**Maintainer**: OpenAgents Framework