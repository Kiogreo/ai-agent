# Agent Development

## OVERVIEW
AI agent ecosystem: 4 main agents, 17 specialized subagents across multiple domains.

## STRUCTURE
```
agent/
├── core/                   # Main user-facing agents
│   ├── openagent.md       # Universal coordinator
│   └── opencoder.md        # Development specialist
├── meta/                   # Meta-level agents
│   └── system-builder.md   # AI system generator
├── subagents/              # Specialized helpers
│   ├── core/               # Coordination subagents
│   │   ├── task-manager.md
│   │   └── documentation.md
│   ├── code/               # Development subagents
│   │   ├── coder-agent.md
│   │   ├── reviewer.md
│   │   ├── tester.md
│   │   └── build-agent.md
│   ├── fitness/            # Fitness domain subagents
│   │   ├── motivation-coach.md
│   │   ├── progress-tracker.md
│   │   ├── form-analyzer.md
│   │   └── nutrition-advisor.md
│   └── system-builder/     # System builder subagents
│       ├── domain-analyzer.md
│       ├── agent-generator.md
│       ├── context-organizer.md
│       ├── workflow-designer.md
│       └── command-creator.md
└── AGENTS.md               # This file
```

## WHERE TO LOOK

| Agent Type | Location | Purpose |
|------------|----------|---------|
| Main agents | `core/` | User-facing, general coordination |
| Meta agents | `meta/` | System-level operations |
| Coordination | `subagents/core/` | Task breakdown, documentation |
| Development | `subagents/code/` | Coding, testing, review |
| Domain-specific | `subagents/{domain}/` | Specialized domain knowledge |

## CONVENTIONS

**Agent File Structure:**
```yaml
---
description: Brief agent purpose
mode: chat | tool
temperature: 0.7
tools: [read, write, bash, lsp]
---
<agent>
  <context>What agent knows</context>
  <role>Agent's identity and scope</role>
  <task>Primary responsibilities</task>
  <workflow_execution>How agent works</workflow_execution>
  <routing_intelligence>When to delegate</routing_intelligence>
</agent>
```

**XML Guidelines:**
- Telegraphic style in XML tags
- 50-200 lines total scope
- Focus on specific domain (not generic)
- Always specify tools in YAML

**Naming Conventions:**
- Main agents: kebab-case (openagent, opencoder)
- Subagents: kebab-case, descriptive (task-manager, form-analyzer)
- Domain grouping: subagents/{domain}/

## ANTI-PATTERNS

**Agent Design:**
- **Generic orchestrators** → Domain-specific focus
- **Monolithic agents** → Split into specialists
- **Missing tools section** → Always specify permissions
- **Vague descriptions** → Clear, scoped purpose

**XML Structure:**
- **Verbose tags** → Telegraphic, essential info only
- **Missing routing** → Always define delegation logic
- **No context** → Specify what agent knows

## UNIQUE STYLES

**Domain Pattern (Fitness example):**
```
agent/
├── fitness-coach.md        # Main orchestrator
└── subagents/fitness/
    ├── motivation-coach.md  # Emotional support
    ├── progress-tracker.md  # Data analysis
    ├── form-analyzer.md     # Technical feedback
    └── nutrition-advisor.md # Diet guidance
```

**Reusable for any domain:** e-commerce, customer-support, data-analysis, etc.

**Meta-Agent Pattern:**
- system-builder.md creates complete agent ecosystems
- Uses domain-analyzer to understand requirements
- Generates agents, commands, context, workflows automatically

## NOTES

**Agent Categories:**
1. **Core** - Main user-facing agents (openagent, opencoder)
2. **Meta** - System-level operations (system-builder)
3. **Subagents** - Specialized helpers auto-delegated by core agents

**Delegation Flow:**
```
User Request → Core Agent → Subagent(s) → Response
```

**Quality Standards:**
- All agents must have YAML frontmatter
- XML structure required for proper execution
- Tools permissions must be explicitly defined
- Domain focus over generic functionality