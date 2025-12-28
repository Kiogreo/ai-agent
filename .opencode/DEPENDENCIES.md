# OpenAgents Component Dependencies

This document maps the relationships and dependencies between OpenAgents components, showing how agents delegate to subagents and which context files they load.

## 📊 Dependency Overview

| Component Type | Count | Dependencies |
|----------------|-------|--------------|
| **Agents** | 17 | Delegate to subagents, load context files |
| **Subagents** | 13 | Specialized implementations |
| **Commands** | 9 | Independent utilities |
| **Context Files** | 12 | Loaded by agents |
| **Tools** | 2 | Used by agents |
| **Plugins** | 2 | External integrations |

---

## 🤖 Agent Dependencies

### Core Agents

#### openagent
**Path**: `agent/core/openagent.md`
**Version**: 1.0.0
**Purpose**: Universal coordinator for general tasks

**Delegates to**:
- `task-manager` - Task breakdown and planning
- `documentation` - Documentation authoring
- `tester` - Test creation and validation
- `reviewer` - Code review and security analysis
- `coder-agent` - Quick implementation tasks
- `build-agent` - Build and type checking
- `codebase-pattern-analyst` - Pattern discovery
- `image-specialist` - Image generation
- `domain-analyzer` - Domain analysis
- `agent-generator` - Agent generation
- `context-organizer` - Context organization
- `workflow-designer` - Workflow design
- `command-creator` - Command creation

**Loads Context Files**:
- `standards/code.md` - Code style guidelines
- `standards/docs.md` - Documentation standards
- `standards/tests.md` - Testing standards
- `workflows/review.md` - Code review workflows
- `workflows/delegation.md` - Delegation processes

#### opencoder
**Path**: `agent/core/opencoder.md`
**Version**: 1.0.0
**Purpose**: Specialized development agent

**Delegates to**:
- `task-manager` - Task breakdown and planning
- `coder-agent` - Implementation tasks
- `tester` - Test creation
- `reviewer` - Code review
- `build-agent` - Build validation
- `codebase-pattern-analyst` - Pattern analysis

**Loads Context Files**:
- `standards/code.md` - Code standards
- `standards/patterns.md` - Pattern definitions
- `standards/analysis.md` - Analysis patterns
- `workflows/task-breakdown.md` - Task planning
- `workflows/review.md` - Review processes

### Meta Agents

#### system-builder
**Path**: `agent/meta/system-builder.md`
**Version**: 1.0.0
**Purpose**: Interactive AI system generation

**Delegates to**:
- `domain-analyzer` - Domain analysis
- `agent-generator` - Agent creation
- `context-organizer` - Context organization
- `workflow-designer` - Workflow design
- `command-creator` - Command creation

**Loads Context Files**:
- `system/context-guide.md` - Context loading guide
- `workflows/delegation.md` - Delegation patterns

### Other Agents

#### doc-processor
**Path**: `agent/doc-processor.md`
**Version**: 1.0.0
**Purpose**: Documentation processing

**Delegates to**: None (standalone)
**Loads Context Files**: None (specialized)

---

## 🔄 Delegation Flow

### Primary Delegation Chain
```
openagent (universal coordinator)
├── task-manager (planning)
├── documentation (docs)
├── coder-agent (implementation)
├── tester (testing)
├── reviewer (review)
├── build-agent (build)
├── codebase-pattern-analyst (analysis)
├── image-specialist (images)
└── system-builder (meta)
    ├── domain-analyzer
    ├── agent-generator
    ├── context-organizer
    ├── workflow-designer
    └── command-creator
```

### Specialized Delegation Chain
```
opencoder (development specialist)
├── task-manager (planning)
├── coder-agent (implementation)
├── tester (testing)
├── reviewer (review)
├── build-agent (build)
└── codebase-pattern-analyst (analysis)
```

---

## 📚 Context File Dependencies

### Loaded by openagent
- **standards/code.md** - Code style and architecture patterns
- **standards/docs.md** - Documentation structure and tone
- **standards/tests.md** - Testing frameworks and coverage
- **workflows/review.md** - Code review checklists and processes
- **workflows/delegation.md** - Subagent delegation patterns

### Loaded by opencoder
- **standards/code.md** - Code standards
- **standards/patterns.md** - Implementation patterns
- **standards/analysis.md** - Code analysis techniques
- **workflows/task-breakdown.md** - Complex task planning
- **workflows/review.md** - Code review processes

### Loaded by system-builder
- **system/context-guide.md** - Context loading mechanics
- **workflows/delegation.md** - Agent coordination patterns

### Universal Context Files
- **essential-patterns.md** - Basic coding patterns (loaded by all)
- **project-context.md** - Project-specific patterns (loaded by all)

### Specialized Context Files
- **standards/analysis.md** - Code analysis patterns
- **workflows/sessions.md** - Session management
- **workflows/task-breakdown.md** - Complex task planning

---

## 🔧 Tool Dependencies

### Used by Agents
- **env tool** - Environment variable loading (used by all agents)
- **gemini tool** - AI image generation (used by image-specialist subagent)

### Tool Integration Points
- **Environment loading**: Automatic .env file detection and loading
- **Image processing**: Gemini API integration for generation/editing/analysis
- **File management**: Smart naming and conflict resolution

---

## 🔌 Plugin Dependencies

### External Integrations
- **telegram-notify** - Telegram bot for session notifications
- **notify** - Simple session completion alerts

### Plugin Integration Points
- **Session monitoring**: Detect idle sessions
- **Message tracking**: Capture last messages for retrieval
- **Notification delivery**: Send alerts via Telegram or system notifications

---

## 📋 Command Dependencies

### Independent Commands
All commands are standalone utilities that don't depend on specific agents:

- **build-context-system** - Uses system-builder agent
- **commit** - Git integration (independent)
- **test** - Testing workflows (independent)
- **optimize** - Code optimization (independent)
- **validate-repo** - Repository validation (independent)
- **context** - Context management (independent)
- **clean** - Cleanup operations (independent)
- **worktrees** - Git worktree management (independent)
- **prompt-enhancer** - Prompt improvement (independent)

---

## 🔗 Dependency Graph

```
┌─────────────────┐
│   openagent     │ ← Universal coordinator
│   (core)        │
└─────┬───────────┘
      │
      ├─ task-manager ──┐
      ├─ documentation ─┤
      ├─ coder-agent ───┤
      ├─ tester ────────┤
      ├─ reviewer ──────┤
      ├─ build-agent ───┤
      ├─ codebase-pattern-analyst ─┐
      ├─ image-specialist ─────────┤
      └─ system-builder ──────────┐│
          │                       ││
          ├─ domain-analyzer      ││
          ├─ agent-generator      ││
          ├─ context-organizer    ││
          ├─ workflow-designer    ││
          └─ command-creator      ││
                                  ││
┌─────────────────┐               ││
│   opencoder     │ ← Development ││
│   (core)        │   specialist  ││
└─────┬───────────┘               ││
      │                           ││
      ├─ task-manager             ││
      ├─ coder-agent              ││
      ├─ tester                   ││
      ├─ reviewer                 ││
      ├─ build-agent              ││
      └─ codebase-pattern-analyst ││
                                  ││
┌─────────────────┐               ││
│ Context Files   │ ← Loaded by   ││
│ (12 files)      │   agents      ││
└─────────────────┘               ││
                                  ││
┌─────────────────┐               ││
│ Tools & Plugins │ ← Used by     ││
│ (4 total)       │   agents      ││
└─────────────────┘               ││
```

---

## 🎯 Usage Patterns

### For General Tasks
Use **openagent** → delegates to appropriate subagents based on task complexity

### For Development Work
Use **opencoder** → specialized delegation chain for coding tasks

### For System Building
Use **system-builder** → meta-level delegation for AI architecture creation

### Context Loading
All agents automatically load relevant context files based on task type:
- Code tasks → `standards/code.md`
- Documentation → `standards/docs.md`
- Testing → `standards/tests.md`
- Reviews → `workflows/review.md`
- Delegation → `workflows/delegation.md`

---

## 🔍 Finding Dependencies

### By Agent
- **openagent**: Most comprehensive delegation (13 subagents)
- **opencoder**: Development-focused delegation (6 subagents)
- **system-builder**: Meta-level delegation (5 subagents)

### By Subagent
- **task-manager**: Used by both core agents
- **coder-agent**: Used by both core agents
- **tester**: Used by both core agents
- **reviewer**: Used by both core agents
- **documentation**: Used by openagent only
- **build-agent**: Used by both core agents
- **codebase-pattern-analyst**: Used by both core agents
- **image-specialist**: Used by openagent only
- **System builder subagents**: Used by system-builder only

### By Context File
- **standards/code.md**: Used by both core agents
- **standards/docs.md**: Used by openagent
- **standards/tests.md**: Used by openagent
- **standards/patterns.md**: Used by opencoder
- **standards/analysis.md**: Used by opencoder
- **workflows/review.md**: Used by both core agents
- **workflows/delegation.md**: Used by openagent and system-builder
- **workflows/task-breakdown.md**: Used by opencoder

---

## 📖 Maintenance Notes

### Adding New Agents
1. Define delegation targets in agent configuration
2. Specify context files to load
3. Update this dependency document
4. Test delegation flow

### Adding New Context Files
1. Determine which agents should load the file
2. Update agent configurations
3. Update this dependency document
4. Verify context loading works

### Adding New Tools/Plugins
1. Document integration points
2. Update agent configurations if needed
3. Update this dependency document
4. Test integration

---

**Last updated**: 2025-12-28
**Framework version**: 1.0.0