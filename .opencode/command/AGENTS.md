# Command Development

## OVERVIEW
Slash command system: 13 commands for development workflows, validation, and automation.

## STRUCTURE
```
command/
├── build-context-system.md    # Interactive AI system builder
├── clean.md                    # Code cleanup (Prettier, ESLint, etc.)
├── commit.md                   # Smart git commits
├── context.md                  # Context management
├── optimize.md                 # Code optimization
├── test.md                     # Testing workflows
├── validate-repo.md            # Repository validation
├── worktrees.md                # Git worktree management
├── prompt-engineering/
│   └── prompt-enhancer.md      # Prompt improvement
└── fitness/                    # Fitness domain commands (4 files)
    ├── track-progress.md
    ├── analyze-form.md
    ├── motivate.md
    └── nutrition-advice.md
```

## WHERE TO LOOK

| Task | Command | Notes |
|------|---------|-------|
| Git commits | `/commit` | Conventional commits with emoji |
| Code quality | `/clean` | Prettier + ESLint + TypeScript |
| Testing | `/test` | Run test pipeline |
| Validation | `/validate-repo` | Check repo consistency |
| AI systems | `/build-context-system` | Generate custom agents |
| Optimization | `/optimize` | Performance + security analysis |

## CONVENTIONS

**Command File Structure:**
```yaml
---
description: Brief command purpose (1 line)
arguments:
  - name: arg_name
    type: string | boolean | number
    description: What it does
    default: value
    required: true | false
---

# Command Name

## Overview
{1-2 sentences}

## Usage
\`\`\`bash
/command-name [args]
\`\`\`

## Process
1. Step one
2. Step two

## Output
{Expected result}
```

**Guidelines:**
- YAML frontmatter required
- 30-100 lines total
- Telegraphic style
- Include usage examples
- Define all arguments

## ANTI-PATTERNS

- **Missing arguments** → Define all parameters in YAML
- **Verbose descriptions** → Keep it telegraphic
- **No examples** → Always show usage
- **Generic commands** → Domain-specific focus

## UNIQUE STYLES

**Domain Commands (Fitness):**
- Grouped in `command/fitness/`
- Integrate with domain subagents
- Load domain context automatically
- Follow domain standards

**Meta Commands:**
- `/build-context-system` - Generates complete AI systems
- `/validate-repo` - Enforces repository standards
- `/commit` - Smart git workflow automation

## NOTES

**Command Invocation:**
```
User: /commit
Agent: Loads commit.md → Executes workflow
```

**Argument Handling:**
- Optional args have defaults
- Required args validated before execution
- Type checking enforced

**Integration:**
- Commands can delegate to subagents
- Load relevant context files
- Follow project standards
