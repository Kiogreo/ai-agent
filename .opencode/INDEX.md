# OpenAgents Component Index

This index provides a comprehensive overview of all components in the OpenAgents framework, organized by category and purpose.

## 📊 Component Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Agents** | 17 | Main AI agents and subagents |
| **Commands** | 9 | Slash commands |
| **Context** | 12 | Coding patterns and standards |
| **Tools** | 2 | TypeScript implementations |
| **Plugins** | 2 | External integrations |
| **Total** | **42** | All components |

---

## 🤖 Agents (17 total)

### Core Agents (2)
Main user-facing agents for general tasks and specialized workflows.

| Agent | Path | Version | Purpose |
|-------|------|---------|---------|
| **openagent** | `agent/core/openagent.md` | 1.0.0 | Universal coordinator for general tasks, questions, and workflows |
| **opencoder** | `agent/core/opencoder.md` | 1.0.0 | Specialized development agent for complex coding and architecture |

### Meta Agents (1)
High-level agents for system generation and architecture.

| Agent | Path | Version | Purpose |
|-------|------|---------|---------|
| **system-builder** | `agent/meta/system-builder.md` | 1.0.0 | Interactive generator for custom AI architectures |

### Other Agents (1)
Specialized agents for specific domains.

| Agent | Path | Version | Purpose |
|-------|------|---------|---------|
| **doc-processor** | `agent/doc-processor.md` | 1.0.0 | Processes and transforms technical documentation |

### Code Subagents (5)
Specialized agents for software development tasks.

| Subagent | Path | Version | Purpose |
|----------|------|---------|---------|
| **coder-agent** | `agent/subagents/code/coder-agent.md` | 1.0.0 | Quick implementation tasks |
| **reviewer** | `agent/subagents/code/reviewer.md` | 1.0.0 | Code review and security analysis |
| **tester** | `agent/subagents/code/tester.md` | 1.0.0 | Test creation and validation |
| **build-agent** | `agent/subagents/code/build-agent.md` | 1.0.0 | Build and type checking |
| **codebase-pattern-analyst** | `agent/subagents/code/codebase-pattern-analyst.md` | 1.0.0 | Pattern discovery and analysis |

### Core Subagents (2)
Fundamental coordination and documentation agents.

| Subagent | Path | Version | Purpose |
|----------|------|---------|---------|
| **task-manager** | `agent/subagents/core/task-manager.md` | 1.0.0 | Task breakdown and planning |
| **documentation** | `agent/subagents/core/documentation.md` | 1.0.0 | Documentation authoring |

### System Builder Subagents (5)
Meta-level agents for creating custom AI systems.

| Subagent | Path | Version | Purpose |
|----------|------|---------|---------|
| **domain-analyzer** | `agent/subagents/system-builder/domain-analyzer.md` | 1.0.0 | Domain analysis and agent recommendations |
| **agent-generator** | `agent/subagents/system-builder/agent-generator.md` | 1.0.0 | XML-optimized agent generation |
| **context-organizer** | `agent/subagents/system-builder/context-organizer.md` | 1.0.0 | Context file organization |
| **workflow-designer** | `agent/subagents/system-builder/workflow-designer.md` | 1.0.0 | Workflow design and success criteria |
| **command-creator** | `agent/subagents/system-builder/command-creator.md` | 1.0.0 | Custom command creation |

### Utils Subagents (1)
Utility agents for specialized tasks.

| Subagent | Path | Version | Purpose |
|----------|------|---------|---------|
| **image-specialist** | `agent/subagents/utils/image-specialist.md` | 1.0.0 | Image generation with Gemini AI |

---

## ⚡ Commands (9 total)

Slash commands that extend OpenCode functionality.

| Command | Path | Purpose |
|---------|------|---------|
| **build-context-system** | `command/build-context-system.md` | Interactive AI system generation |
| **clean** | `command/clean.md` | Cleanup operations |
| **commit** | `command/commit.md` | Smart git commits with conventional format |
| **context** | `command/context.md` | Context management |
| **optimize** | `command/optimize.md` | Code optimization |
| **prompt-enhancer** | `command/prompt-engineering/prompt-enhancer.md` | Improve prompts |
| **test** | `command/test.md` | Testing workflows |
| **validate-repo** | `command/validate-repo.md` | Repository consistency validation |
| **worktrees** | `command/worktrees.md` | Git worktree management |

---

## 📚 Context Files (12 total)

Coding patterns and standards that agents automatically load.

### Core Context (11)
Essential patterns and standards.

| Context File | Path | Purpose |
|--------------|------|---------|
| **essential-patterns** | `context/core/essential-patterns.md` | Universal coding patterns |
| **standards/code** | `context/core/standards/code.md` | Code style guidelines |
| **standards/docs** | `context/core/standards/docs.md` | Documentation standards |
| **standards/patterns** | `context/core/standards/patterns.md` | Pattern definitions |
| **standards/tests** | `context/core/standards/tests.md` | Testing standards |
| **standards/analysis** | `context/core/standards/analysis.md` | Code analysis patterns |
| **system/context-guide** | `context/core/system/context-guide.md` | Context loading guide |
| **workflows/delegation** | `context/core/workflows/delegation.md` | Delegation processes |
| **workflows/review** | `context/core/workflows/review.md` | Code review workflows |
| **workflows/sessions** | `context/core/workflows/sessions.md` | Session management |
| **workflows/task-breakdown** | `context/core/workflows/task-breakdown.md` | Task planning |

### Project Context (1)
Project-specific patterns.

| Context File | Path | Purpose |
|--------------|------|---------|
| **project-context** | `context/project/project-context.md` | Your project-specific patterns |

---

## 🔧 Tools (2 total)

TypeScript implementations that extend agent capabilities.

| Tool | Path | Purpose |
|------|------|---------|
| **env** | `tool/env/index.ts` | Environment variable loading |
| **gemini** | `tool/gemini/index.ts` | AI image generation and editing |

---

## 🔌 Plugins (2 total)

External integrations for notifications and automation.

| Plugin | Path | Purpose |
|--------|------|---------|
| **notify** | `plugin/notify.ts` | Simple session notifications |
| **telegram-notify** | `plugin/telegram-notify.ts` | Telegram bot notifications |

---

## 📋 Installation Profiles

Components are organized into installation profiles:

### 🎯 Essential (9 components)
- **Agents**: openagent
- **Subagents**: task-manager, documentation
- **Commands**: context, clean
- **Tools**: env
- **Context**: essential-patterns, project-context
- **Config**: env-example

### 💼 Developer (28 components)
- Everything in Essential, plus:
- **Agents**: opencoder
- **Subagents**: coder-agent, reviewer, tester, build-agent, codebase-pattern-analyst
- **Commands**: commit, test, optimize, validate-repo
- **Context**: All standards and workflow files

### 📊 Business (15 components)
- **Agents**: openagent
- **Subagents**: task-manager, documentation, image-specialist
- **Commands**: context, clean, prompt-enhancer
- **Tools**: env, gemini
- **Plugins**: notify, telegram-notify
- **Context**: essential-patterns, project-context

### 📦 Full (41 components)
- Everything in Developer and Business combined (no duplicates)
- **Agents**: system-builder (meta)
- **Subagents**: All code and system-builder subagents
- **Commands**: All commands
- **Tools**: env and gemini
- **Plugins**: notify and telegram-notify
- **Context**: All context files

### 🚀 Advanced (41 components)
- Same as Full profile
- **System Builder**: All meta-level generation capabilities

---

## 🔗 Quick Reference

### By Category
- **Core Agents**: openagent, opencoder
- **Meta Agents**: system-builder
- **Code Subagents**: coder-agent, reviewer, tester, build-agent, codebase-pattern-analyst
- **Core Subagents**: task-manager, documentation
- **System Builder**: domain-analyzer, agent-generator, context-organizer, workflow-designer, command-creator
- **Utils**: image-specialist

### By Purpose
- **Coordination**: openagent, task-manager
- **Development**: opencoder, coder-agent, reviewer, tester, build-agent
- **Documentation**: documentation, doc-processor
- **Analysis**: codebase-pattern-analyst, domain-analyzer
- **Generation**: system-builder, agent-generator, context-organizer, workflow-designer, command-creator
- **Utilities**: image-specialist, env, gemini

### By Technology
- **AI/ML**: gemini, image-specialist
- **Git**: commit, worktrees
- **Testing**: test, tester
- **Build**: optimize, build-agent
- **Communication**: telegram-notify, notify

---

## 📖 Usage

This index helps you:
- **Discover components** by category or purpose
- **Find specific agents** for your needs
- **Understand dependencies** between components
- **Plan installations** using profiles
- **Navigate the codebase** efficiently

For detailed documentation on each component, see the individual files in their respective directories.

---

**Last updated**: 2025-12-28
**Total components**: 42
**Framework version**: 1.0.0