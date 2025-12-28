# AI AGENT DEVELOPMENT ENVIRONMENT

**Generated:** 2025-12-28  
**Commit:** 8794fc8  
**Branch:** main  
**Type:** OpenCode CLI + Fitness Coaching Extension

## OVERVIEW

OpenAgents framework for AI development with Trello/GitHub MCP integration. Extended with fitness coaching domain (bear aesthetic bodybuilding). Markdown-based agents, context-aware execution, approval-first workflows.

## STRUCTURE

```
./
├── .opencode/          # Agent framework (66 .md files)
│   ├── agent/          # 4 main + 17 subagents
│   │   ├── core/       # openagent, opencoder (universal)
│   │   ├── meta/       # system-builder (AI system generator)
│   │   └── subagents/  # fitness/, code/, core/, system-builder/
│   ├── command/        # 13 slash commands (+ fitness/ subdomain)
│   ├── context/        # 21 context files
│   │   ├── core/       # standards/, workflows/, system/
│   │   ├── domain/     # fitness/ (NON-STANDARD)
│   │   ├── processes/  # fitness/ workflows (NON-STANDARD)
│   │   ├── standards/  # fitness/ standards (NON-STANDARD)
│   │   └── templates/  # fitness/ templates (NON-STANDARD)
│   ├── workflows/      # fitness/ workflows (NON-STANDARD)
│   ├── tool/           # gemini/, env/ implementations
│   └── plugin/         # telegram-notify implementation
├── .github/            # PR template
├── opencode.jsonc      # MCP config (Trello bunx, GitHub Docker)
└── .env.example        # Credential template
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new agent | `.opencode/agent/` or `subagents/` | YAML frontmatter required |
| Add slash command | `.opencode/command/` | Markdown + YAML |
| Define coding patterns | `.opencode/context/core/standards/` | Auto-loaded by agents |
| Add domain knowledge | `.opencode/context/domain/{domain}/` | Fitness pattern |
| Configure MCP | `opencode.jsonc` | bunx (Trello), Docker (GitHub) |
| Fitness coaching | `.opencode/agent/fitness-coach.md` | Bear aesthetic focus |
| System generation | `/build-context-system` | Interactive AI system builder |

## CONVENTIONS (DEVIATIONS FROM STANDARD)

**Non-Standard Structure:**
- **domain/processes/standards/templates/** in context/ (standard: only core/project/)
- **workflows/** directory (not in base OpenCode)
- **Fitness-specific primary agents** in agent/ (fitness-coach, motivation-agent, progress-tracker)
- **Domain subdirectories** in command/ (fitness/)
- **tool/ and plugin/** with implementations (standard: optional, no implementations)

**Context Loading Rules:**
- Max 4 files per command (250-450 lines total)
- NEVER execute code/docs/tests without loading standards first
- ALWAYS load context before delegation
- Files: 50-150 lines each (focused)

**Agent Execution:**
- NEVER auto-fix - always report → propose → approve → fix
- NEVER implement entire plan at once - incremental only
- ALWAYS request approval before write/edit/bash
- STOP on test fail/errors (no auto-fix)

**Security:**
- NEVER hardcode credentials (use env vars)
- NEVER log secrets (API keys, tokens)
- ALWAYS validate input (prevent injection)
- ALWAYS use ${env:VAR} in opencode.jsonc

## ANTI-PATTERNS (THIS PROJECT)

**Agent Development:**
- **Skip approval gate** → ALWAYS request approval before execution
- **Auto-fix errors** → Report → propose → approve → fix
- **Execute without context** → Load standards FIRST (code.md, docs.md, tests.md)
- **Batch implementation** → Incremental, one step at a time
- **Skip LoadContext step** → MANDATORY before any code/docs/tests

**Context Management:**
- **Delete outside session** → ONLY delete tracked files, confirm first
- **Exceed 4 file limit** → Max 4 context files (250-450 lines total)
- **Generic advice** → Project-specific only
- **Repeat parent content** → Child AGENTS.md NEVER repeats parent

**MCP Integration:**
- **Hardcode credentials** → Use TRELLO_API_KEY, GITHUB_PERSONAL_ACCESS_TOKEN env vars
- **Skip input validation** → ALWAYS validate external data
- **Log sensitive data** → NEVER log tokens/keys

**Code Structure:**
- **Mutation/side effects** → Pure functions only
- **Deep nesting (>3 levels)** → Flatten
- **Large functions (>50 lines)** → Split
- **Global state** → Dependency injection
- **Tight coupling** → Composition over inheritance

## UNIQUE STYLES

**Fitness Domain Integration:**
- Bear aesthetic bodybuilding focus (stocky, muscular chub, strong belly)
- Kink-aware motivational messaging
- Liftosaur workout tracking integration
- Privacy-first image/video analysis (temporary processing, never stored)
- Domain-specific context structure (domain/processes/standards/templates/)

**Agent Architecture:**
- Hierarchical: orchestrator → subagents (manager-worker pattern)
- Context-aware: auto-load standards before execution
- Approval-first: plan → approve → execute → validate → summarize
- Incremental: step-by-step with validation gates

**MCP Configuration:**
- Trello: bunx @delorenj/mcp-server-trello (local)
- GitHub: Docker ghcr.io/github/github-mcp-server (containerized)
- Environment variable injection: ${env:VAR_NAME}

## COMMANDS

```bash
# Start agents
opencode --agent openagent              # Universal (questions, tasks, coordination)
opencode --agent opencoder              # Development (complex coding, refactoring)
opencode --agent fitness-coach          # Fitness coaching (bear aesthetic)
opencode --agent system-builder         # AI system generator

# Slash commands
/commit                                 # Smart git commits (conventional format)
/test                                   # Testing workflows
/optimize                               # Code optimization
/clean                                  # Cleanup operations
/context                                # Context management
/validate-repo                          # Repository validation
/build-context-system                   # Generate custom AI systems
/track-progress                         # Fitness progress (Liftosaur integration)
/analyze-form                           # Exercise form analysis (privacy-protected)
/coach-me                               # Motivational coaching (kink-aware)
/set-goal                               # Fitness goal setting

# Development
cd .opencode && bun install             # Install dependencies
/validate-repo                          # Validate structure
```

## NOTES

**Fitness System:**
- Fully integrated with existing OpenCode framework
- Leverages image-specialist for visual analysis
- Privacy-first: images processed temporarily, never stored
- Liftosaur API integration for workout tracking
- Bear aesthetic focus: chest/arms/shoulders/back priority, belly aesthetic maintenance

**MCP Servers:**
- Trello: Requires TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_WORKSPACE_ID
- GitHub: Requires GITHUB_PERSONAL_ACCESS_TOKEN
- Both configured in opencode.jsonc with ${env:} references

**Context Loading:**
- Agents auto-load context before execution
- Code tasks → core/standards/code.md
- Docs tasks → core/standards/docs.md
- Tests tasks → core/standards/tests.md
- Fitness tasks → domain/fitness/*.md

**Non-Obvious:**
- package.json in .opencode/ (Node.js deps for plugins/tools)
- Workflows directory (not in standard OpenCode)
- Multiple README.md files (.opencode/, .opencode/plugin/, .opencode/tool/)
- DEPENDENCIES.md and INDEX.md in .opencode/ (additional docs)
- Domain-specific context structure (fitness pattern for future domains)

**Security:**
- All credentials in .env (gitignored)
- No hardcoded secrets (validated)
- MCP servers use env var injection
- Input validation on all external data