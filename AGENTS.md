# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-03 08:15:00 +0800  
**Commit:** f2cbf6c  
**Branch:** main

## OVERVIEW
OpenCode AI Agent Framework - Development environment with 21 agents, 13 commands, MCP integrations (GitHub), and intelligent code generation.

## STRUCTURE
```
.
├── .opencode/              # OpenAgents framework core
│   ├── agent/              # 21 agents (4 main + 17 subagents)
│   │   └── AGENTS.md       # Agent development guide
│   ├── command/            # 13 slash commands
│   │   └── AGENTS.md       # Command development guide
│   ├── context/            # 21 context files (standards, workflows)
│   │   └── AGENTS.md       # Context management guide
│   ├── tool/               # env loader, Gemini AI
│   │   └── AGENTS.md       # Tool development guide
│   ├── plugin/             # Telegram notifications
│   │   └── AGENTS.md       # Plugin development guide
│   ├── workflows/          # Domain workflows (fitness)
│   └── AGENTS.md           # Framework overview
├── .input/                 # Input files for processing
├── .output/                # Generated outputs
├── openagent-install.sh    # Installer script
├── opencode.jsonc          # OpenCode configuration
├── .env.example            # Environment template
└── AGENTS.md               # This file (project knowledge base)
```

**Note:** Each major directory contains an AGENTS.md file for domain-specific guidance.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Create agent | `.opencode/agent/` | YAML + XML structure |
| Add command | `.opencode/command/` | YAML + Markdown |
| Define standards | `.opencode/context/core/standards/` | Auto-loaded |
| Add domain | `.opencode/context/domain/{domain}/` | Follow fitness pattern |
| Implement tool | `.opencode/tool/{name}/` | TypeScript (Bun) |
| Add plugin | `.opencode/plugin/{name}/` | @opencode-ai/plugin |
| Configure MCP | `opencode.jsonc` | GitHub integration |
| Environment vars | `.env` | Credentials (gitignored) |

## CONVENTIONS

### File Naming
```
lowercase-with-dashes.ts        # TypeScript files
lowercase-with-dashes.md        # Markdown files
UPPER_CASE.md                   # Documentation (README, AGENTS)
```

### Code Style
**Philosophy:** Modular, Functional, Maintainable

```typescript
// ✅ Pure functions, immutability, small (<50 lines)
export async function getApiKey(name: string): Promise<string>

// ✅ Explicit types, verb phrases, early returns
if (!value) throw new Error(`${name} not found`)

// ✅ Result pattern for error handling
return { success: true, data: result }
```

### Agent Structure
```yaml
---
description: Brief purpose
mode: chat | tool
temperature: 0.7
tools: [read, write, bash]
---
<agent>
  <context>What agent knows</context>
  <role>Agent identity</role>
  <task>Responsibilities</task>
</agent>
```

### Command Structure
```yaml
---
description: Command purpose
arguments:
  - name: arg_name
    type: string
    required: false
---
# Command workflow
```

## ANTI-PATTERNS (THIS PROJECT)

**Code:**
- ❌ Mutation → ✅ Immutability
- ❌ Side effects → ✅ Pure functions
- ❌ Deep nesting → ✅ Early returns
- ❌ Large functions (>50 lines) → ✅ Small, focused
- ❌ Hardcoded credentials → ✅ Environment variables

**Agents:**
- ❌ Generic orchestrators → ✅ Domain-specific focus
- ❌ Monolithic agents → ✅ Split into subagents
- ❌ Missing YAML tools → ✅ Always specify permissions

**Context:**
- ❌ Flat structure → ✅ Hierarchical (domain/processes/standards)
- ❌ Large files (>150 lines) → ✅ Split into focused files
- ❌ Duplicate standards → ✅ Don't repeat core/ in domain/

## UNIQUE STYLES

**Domain Pattern (Fitness example):**
```
.opencode/
├── agent/subagents/fitness/     # 4 specialists
├── command/fitness/             # 4 commands
├── context/domain/fitness/      # 3 knowledge files
├── context/processes/fitness/   # 2 workflows
├── context/standards/fitness/   # 2 rules
└── workflows/fitness/           # 2 workflow definitions
```

**Reusable for:** e-commerce, customer-support, data-analysis, etc.

**Bun Runtime:**
```bash
bun run .opencode/tool/gemini/index.ts  # Direct execution
GEMINI_TEST_MODE=true bun test          # Test mode
```

**MCP Integration:**
```jsonc
// opencode.jsonc
"mcp": {
  "canva": {
    "enabled": true,
    "command": ["npx", "-y", "mcp-remote@latest", "https://mcp.canva.com/mcp"]
  },
  "github": {
    "enabled": true,
    "command": ["docker", "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
    "environment": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_PERSONAL_ACCESS_TOKEN}" }
  },
  "context7": {
    "enabled": true,
    "command": ["npx", "-y", "@upstash/context7-mcp"],
    "environment": { "CONTEXT7_API_KEY": "${env:CONTEXT7_API_KEY}" }
  }
}
```

## COMMANDS

```bash
# Development
/commit                    # Smart git commits (conventional + emoji)
/clean                     # Prettier + ESLint + TypeScript
/test                      # Run test pipeline
/optimize                  # Performance + security analysis

# Validation
/validate-repo             # Check repo consistency

# Context
/context                   # Context management
/build-context-system      # Generate custom AI systems

# Git
/worktrees                 # Git worktree management

# AI
/prompt-enhancer           # Improve prompts

# Setup
cd .opencode && bun install           # Install dependencies
opencode --agent openagent            # Start universal agent
```

## NOTES

**Agent Hierarchy:**
```
User → Core Agent (openagent/opencoder) → Subagents → Response
```

**Context Loading:**
- Agents auto-load: core/ → domain/ → processes/ → standards/
- Max 4 files per agent (250-450 lines total)
- Project-specific patterns override defaults

**Detailed Guides:**
- TypeScript patterns → `.opencode/context/core/standards/typescript-patterns.md`
- Code standards → `.opencode/context/core/standards/code.md`
- Test patterns → `.opencode/context/core/standards/tests.md`
- Documentation → `.opencode/context/core/standards/docs.md`

**Security:**
- All credentials in .env (gitignored)
- Use ${env:VAR} in opencode.jsonc
- Never hardcode secrets
- Never log credentials

**Quality Standards:**
- Functions < 50 lines
- Explicit TypeScript types
- Pure functions preferred
- Telegraphic documentation style

**Backup:**
- `.opencode.backup.20260102-213812/` - Previous framework version
- Safe to delete after validation

**Testing:**
```bash
bun test                              # All tests
GEMINI_TEST_MODE=true bun test       # Mock API calls
```
