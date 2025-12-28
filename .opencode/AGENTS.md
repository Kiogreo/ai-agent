# .opencode/ - OpenAgents Framework Core

## OVERVIEW
Agent framework implementation: 4 main agents, 17 subagents, 13 commands, 21 context files, 2 tools, 2 plugins.

## STRUCTURE
```
.opencode/
├── agent/              # 4 main + 17 subagents
│   ├── core/           # openagent.md, opencoder.md
│   ├── meta/           # system-builder.md
│   └── subagents/      # fitness/, code/, core/, system-builder/
├── command/            # 13 slash commands
│   ├── fitness/        # 4 fitness commands
│   └── *.md            # 9 core commands
├── context/            # 21 context files
│   ├── core/           # standards/, workflows/, system/
│   ├── domain/fitness/ # 3 files (bear aesthetics, training, liftosaur)
│   ├── processes/fitness/ # 2 files (progress, form analysis)
│   ├── standards/fitness/ # 2 files (privacy, metrics)
│   └── templates/fitness/ # 1 file (progress report)
├── workflows/fitness/  # 2 workflow files
├── tool/               # gemini/, env/ implementations
├── plugin/             # telegram-notify implementation
├── package.json        # @opencode-ai/plugin dependency
└── *.md                # README, DEPENDENCIES, INDEX
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Create agent | `agent/` or `agent/subagents/{category}/` | YAML frontmatter + XML structure |
| Add command | `command/` or `command/{domain}/` | Markdown + YAML args |
| Define standards | `context/core/standards/` | Auto-loaded by agents |
| Add domain | `context/domain/{domain}/` | Fitness pattern |
| Add workflow | `workflows/{domain}/` | Non-standard location |
| Implement tool | `tool/{name}/` | Node.js implementation |
| Add plugin | `plugin/{name}/` | Node.js implementation |

## CONVENTIONS

**Agent Files:**
- YAML frontmatter: description, mode, temperature, tools
- XML structure: context, role, task, workflow_execution, routing_intelligence
- Telegraphic style in XML tags
- 50-200 lines focused scope

**Command Files:**
- YAML frontmatter: description, arguments (name, type, description, default, required)
- Markdown body: overview, usage examples, process, output format
- 30-100 lines

**Context Files:**
- Markdown only (no frontmatter)
- 50-150 lines each
- Max 4 files loaded per command (250-450 lines total)
- Organized by: core/ (universal), domain/ (specific), processes/ (workflows), standards/ (rules), templates/ (formats)

**Tool/Plugin Implementations:**
- Node.js/TypeScript
- package.json for dependencies
- README.md for usage
- Environment variables for config

## ANTI-PATTERNS

**Agent Development:**
- **Generic orchestrators** → Specific domain focus (fitness-coach, not generic-coach)
- **Monolithic agents** → Split into subagents (motivation-coach, progress-tracker, form-analyzer, nutrition-advisor)
- **Missing YAML tools** → Always specify read/write/bash permissions

**Context Organization:**
- **Flat structure** → Use domain/processes/standards/templates hierarchy
- **Large files (>150 lines)** → Split into focused files
- **Duplicate standards** → Don't repeat core/ in domain/

**Command Structure:**
- **Missing arguments** → Define all parameters in YAML
- **Verbose descriptions** → Telegraphic style
- **No examples** → Always include usage examples

## UNIQUE STYLES

**Fitness Domain Pattern:**
- Primary agent: `agent/fitness-coach.md` (orchestrator)
- Subagents: `agent/subagents/fitness/` (4 specialists)
- Commands: `command/fitness/` (4 commands)
- Context: `context/domain/fitness/`, `context/processes/fitness/`, `context/standards/fitness/`, `context/templates/fitness/`
- Workflows: `workflows/fitness/` (2 workflows)

**This pattern is reusable for other domains** (e.g., e-commerce, customer-support, data-analysis).

**Tool/Plugin Pattern:**
- Implementation in `tool/{name}/` or `plugin/{name}/`
- package.json with dependencies
- README.md with setup instructions
- Environment variables in root .env
- Integration via opencode.jsonc or agent imports

## NOTES

**Non-Standard Directories:**
- `workflows/` - Not in base OpenCode (fitness-specific)
- `context/domain/`, `context/processes/`, `context/standards/`, `context/templates/` - Extended beyond core/project/
- `tool/`, `plugin/` - With actual implementations (standard mentions but doesn't include)

**Package Management:**
- package.json in .opencode/ for plugin dependencies
- Bun runtime recommended
- npm/pnpm/yarn also supported

**Documentation:**
- README.md - Framework overview
- DEPENDENCIES.md - Dependency graph
- INDEX.md - File index
- Multiple README.md in subdirectories (tool/, plugin/)

**MCP Integration:**
- Configured in root opencode.jsonc
- Trello: bunx @delorenj/mcp-server-trello
- GitHub: Docker ghcr.io/github/github-mcp-server
- Environment variables injected via ${env:VAR}