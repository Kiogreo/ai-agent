# Agent Guidelines

## Repository Context
**Purpose**: OpenAgents Framework - A comprehensive library of reusable AI agents for software development, automation, content creation, and any domain
**Type**: AI Agent Framework - Modular agents that can be combined for any use case (Trello automation is just one example)
**Structure**: `.opencode/` (agent framework), `examples/` (sample applications), `.output/` (temp AI outputs)
**Tech Stack**: Node.js/TypeScript, OpenCode CLI, MCP (Model Context Protocol), GitHub Actions
**Config**: Default model `anthropic/claude-sonnet-4-5` in `opencode.jsonc`

## ✅ Security Status
**SECURE**: All credentials properly configured with environment variables. No hardcoded secrets found.

## Build/Test Commands

### OpenAgents Framework (Primary)
- **Install**: `cd .opencode && bun install`
- **Start Universal Agent**: `opencode --agent openagent` (general tasks, questions, coordination)
- **Start Development Agent**: `opencode --agent opencoder` (complex coding, architecture)
- **Start System Builder**: `opencode --agent system-builder` (create custom AI systems)
- **Commands**: `/commit`, `/test`, `/optimize`, `/clean`, `/context`, `/validate-repo`
- **Validation**: Manual review + testing agents in real usage scenarios

### Example Applications (Optional)
- **Trello Automation**: Example bill management system (see README.md for setup)
- **Custom Applications**: Build your own using the agent framework
- **Local Testing**: `npm test` (dry-run mode for examples)
- **Production**: `npm start` (run example applications)

### Testing Commands
- **Framework Tests**: No dedicated test suite (agents validated through usage)
- **Example Tests**: `npm test` (dry-run mode for sample applications)
- **Type Check**: No dedicated type checking configured
- **Lint**: No linting configured at root level
- **Run Specific Test**: `node examples/trello-automation.js --dry-run --verbose`

## Framework Standards

### Configuration
- **Credentials**: Environment variables only - NEVER hardcode API keys
- **MCP Servers**: Configured in `opencode.jsonc` (Trello, GitHub, etc.)
- **Context Files**: Automatic loading based on task type
- **Agent Delegation**: Intelligent routing to specialized subagents

## Agent Library Overview

This repository contains a comprehensive library of AI agents that can be used for:

### 🤖 **Main Agents**
- **openagent**: Universal coordinator for general tasks, questions, and workflows
- **opencoder**: Specialized development agent for complex coding and architecture
- **system-builder**: Interactive generator for creating custom AI architectures

### 🔧 **Specialized Subagents**
- **Core**: task-manager, documentation
- **Code**: coder-agent, reviewer, tester, build-agent, codebase-pattern-analyst
- **System Builder**: domain-analyzer, agent-generator, context-organizer, workflow-designer, command-creator
- **Utils**: image-specialist

### ⚡ **Commands**
- **Development**: `/commit`, `/test`, `/optimize`, `/clean`
- **Management**: `/context`, `/validate-repo`
- **Creation**: `/build-context-system`

### 📚 **Use Cases**
- **Software Development**: Code generation, testing, review, refactoring
- **Automation**: API integrations, workflow automation, task management
- **Content Creation**: Documentation, technical writing, image generation
- **System Architecture**: Custom AI system design and implementation
- **Any Domain**: Agents adapt to your specific needs and patterns

## Code Style Guidelines

### Core Philosophy
**Modular, Functional, Maintainable**: Pure functions, immutability, composition over inheritance. Golden rule: "If you can't easily test it, refactor it."

### JavaScript/TypeScript Conventions
- **Imports**: Node.js built-ins → third-party packages → local modules (alphabetically within groups)
- **Naming**:
  - Files: `kebab-case.js` (e.g., `create-bills-cards.js`)
  - Functions: `verbPhrases` (e.g., `calculateDueDate`, `validateEmail`)
  - Variables: `descriptiveCamelCase` (e.g., `userCount`, `isValidEmail`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `TRELLO_API_KEY`, `DRY_RUN`)
  - Classes: `PascalCase` (e.g., `TrelloClient`, `CardBuilder`)
  - Types: `PascalCase` (e.g., `CardConfig`, `ApiResponse`)
- **Functions**: Pure functions preferred (< 50 lines) - same input = same output, no side effects
- **Async/Await**: Use async/await over promises for readability
- **Error Handling**: Try/catch with specific error types, meaningful messages with context
- **Types**: Use TypeScript interfaces for complex objects, prefer explicit typing

### Functional Programming Patterns
- **Pure Functions**: Same input = same output, no side effects
- **Immutability**: Create new data, don't modify existing (`[...items, item]` not `items.push(item)`)
- **Composition**: Build complex from simple functions (`pipe(validate, enrich, save)`)
- **Declarative**: Describe what, not how (`users.filter(u => u.active).map(u => u.name)`)

### Security Best Practices
- **Secrets**: ALWAYS use environment variables - NEVER commit credentials
- **Input Validation**: Validate all external data (API responses, config files)
- **Sanitization**: Escape user input before logging or displaying
- **API Keys**: Store in GitHub Secrets for Actions, `.env` for local (gitignored)
- **Logging**: NEVER log sensitive data (tokens, API keys, passwords)

### Code Structure
- **Modularity**: Single responsibility per component (< 100 lines, ideally < 50)
- **Pure Functions**: Avoid side effects, return new data instead of mutating
- **Dependency Injection**: Pass dependencies explicitly, no hidden globals
- **Comments**: Explain "why" not "what" - focus on business logic and decisions
- **Error Messages**: Actionable and specific (e.g., "Template card 'Monthly Bills' not found in TEMPLATE list")

### Testing Standards
- **AAA Pattern**: Arrange → Act → Assert (one assertion per test)
- **Coverage Goals**: Critical logic (100%), public APIs (90%+), utilities (80%+)
- **Test Behavior**: Focus on what code does, not implementation details
- **Mock Dependencies**: Use dependency injection for testable code
- **Edge Cases**: Test happy path, boundaries, errors, and invalid inputs

## OpenAgents Framework Standards

### Agent Development
- **Location**: `.opencode/agent/` (organized by category: core, development, content, etc.)
- **Format**: Markdown with YAML frontmatter + structured agent instructions
- **Required YAML**: `description` (with usage examples), `mode: subagent`, optional `tools` permissions
- **Model**: Always `anthropic/claude-sonnet-4-5` (configured in `opencode.jsonc`)
- **File Naming**: `kebab-case.md` (e.g., `openagent.md`, `task-manager.md`)

### Context Loading (Agents)
```markdown
# Agents automatically load context before execution:
- Code tasks → .opencode/context/core/standards/code.md
- Docs tasks → .opencode/context/core/standards/docs.md
- Tests tasks → .opencode/context/core/standards/tests.md
- Review tasks → .opencode/context/core/workflows/review.md
- Delegation → .opencode/context/core/workflows/delegation.md
```



## Quality Standards

### Review Checklist
- ✅ No hardcoded credentials or API keys
- ✅ Environment variables used for secrets
- ✅ Error handling with meaningful messages
- ✅ Pure functions where possible (no unnecessary side effects)
- ✅ Input validation for external data
- ✅ Comments explain "why" not "what"
- ✅ Code follows naming conventions
- ✅ Agent YAML frontmatter complete (if agent PR)

## Quick Reference

### Starting Development
```bash
# Start universal agent (general tasks, questions, coordination)
opencode --agent openagent

# Start development specialist (complex coding, refactoring)
opencode --agent opencoder

# Use commands
/commit          # Smart git commits
/test            # Run tests
/optimize        # Code optimization
/clean           # Cleanup operations
/context         # Load project context
```

### Common Patterns
```javascript
// Pure function example
function calculateDueDate(monthEnd, offsetDays) {
  const dueDate = new Date(monthEnd);
  dueDate.setDate(dueDate.getDate() + offsetDays);
  return dueDate;
}

// Environment variable usage
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('Missing required environment variable: API_KEY');
}
```


