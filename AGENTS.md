# Agent Guidelines

## Repository Context
**Purpose**: Trello automation tool for Casa Tropicana A-7-7 bill management with OpenAgents framework integration
**Type**: Hybrid project - JavaScript automation scripts + AI agent development environment
**Structure**: Root (Trello automation), `.opencode/` (OpenAgents framework), `.output/` (temp AI outputs)
**Tech Stack**: Node.js/JavaScript, Trello API, GitHub Actions, OpenCode CLI, MCP (Model Context Protocol)
**Config**: Default model `anthropic/claude-sonnet-4-5` in `opencode.jsonc`

## ✅ Security Status
**SECURE**: All credentials properly configured with environment variables. No hardcoded secrets found.

## Build/Test Commands

### Trello Automation (Root Level)
- **Install**: No package.json at root - automation uses GitHub Actions runtime
- **Local Setup**: Create `.env` file with `TRELLO_API_KEY` and `TRELLO_TOKEN`
- **Test Locally**: `npm test` (dry-run mode - simulates without creating cards)
- **Run Production**: `npm start` (creates actual Trello cards)
- **Manual Trigger**: GitHub Actions → "Trello Bills Automation" → "Run workflow"
- **View Logs**: GitHub Actions → Select workflow run → "create-bills-cards" job
- **Schedule**: Daily at 1:00 AM UTC (configured in `.github/workflows/trello-automation.yml`)

### OpenAgents Framework (.opencode/)
- **Install**: `cd .opencode && bun install`
- **Start Agent**: `opencode --agent openagent` (universal coordinator)
- **Development**: `opencode --agent opencoder` (complex coding tasks)
- **Commands**: `/commit`, `/test`, `/optimize`, `/clean`, `/context`
- **Validation**: Manual review + testing agents in real usage scenarios

### Testing Commands
- **Single Test Run**: No individual test files - use `npm test` for dry-run validation
- **Full Test Suite**: `npm test` (dry-run) or manual GitHub Actions trigger
- **Type Check**: No dedicated type checking configured
- **Lint**: No linting configured at root level

## Trello Automation Standards

### Configuration
- **Location**: `config.json` (scheduling, template names, date calculations)
- **Credentials**: Environment variables only - NEVER hardcode API keys
- **Templates**: Cards in TEMPLATE list serve as blueprints for automation
- **Scheduling**: Configurable trigger days before month end (default: 7 days)

### Automation Patterns
- **Monthly Bills**: Created 7 days before end of each month
- **Bi-Monthly Bills**: Created 7 days before end of every 2nd month (starting Jan 2026)
- **Card Creation**: Copies title, dates, checklists, labels, members, descriptions, attachments
- **Date Handling**: Smart calculation for start/due dates based on month boundaries

### Error Handling
- **API Failures**: Log detailed error messages with context
- **Missing Templates**: Warn but continue processing other cards
- **Invalid Config**: Fail fast with clear validation messages
- **Dry Run Mode**: Test without creating actual cards (`DRY_RUN=true`)

## Code Style Guidelines

### Core Philosophy
**Modular, Functional, Maintainable**: Pure functions, immutability, composition over inheritance. Golden rule: "If you can't easily test it, refactor it."

### JavaScript/Node.js Conventions
- **Imports**: Node.js built-ins → third-party packages → local modules (alphabetically within groups)
- **Naming**:
  - Files: `kebab-case.js` (e.g., `create-bills-cards.js`)
  - Functions: `verbPhrases` (e.g., `calculateDueDate`, `validateEmail`)
  - Variables: `descriptiveCamelCase` (e.g., `userCount`, `isValidEmail`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `TRELLO_API_KEY`, `DRY_RUN`)
  - Classes: `PascalCase` (e.g., `TrelloClient`, `CardBuilder`)
- **Functions**: Pure functions preferred (< 50 lines) - same input = same output, no side effects
- **Async/Await**: Use async/await over promises for readability
- **Error Handling**: Try/catch with specific error types, meaningful messages with context

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

### Agent Structure
1. **Role Statement**: Clear agent identity and purpose
2. **Core Responsibilities**: What the agent does
3. **Output Structure**: Expected deliverables format
4. **Quality Standards**: Validation criteria
5. **Process Workflow**: Step-by-step execution flow
6. **Usage Examples**: User/Assistant dialogue in YAML description

### Context Files (.opencode/context/)
- **Essential Patterns**: `core/essential-patterns.md` - universal coding patterns
- **Project Context**: `project/project-context.md` - project-specific patterns
- **Standards**: `core/standards/` - code, docs, tests, patterns, analysis
- **Workflows**: `core/workflows/` - delegation, review, sessions, task-breakdown
- **Auto-Loading**: Agents automatically load relevant context before execution

### Commands (.opencode/command/)
- **Format**: Markdown with detailed instructions and examples
- **Invocation**: `/command-name` in OpenCode CLI
- **Common Commands**: `/commit` (smart commits), `/test`, `/optimize`, `/clean`, `/context`
- **Custom Commands**: Create new commands following existing patterns



## Pull Request Guidelines

### PR Template
- **Location**: `.github/pull_request_template.md`
- **Required Sections**: Feature Type, Description, Test Summary (optional), Screenshot (optional)
- **Feature Types**: New Agent, Agent Enhancement, Documentation, Infrastructure

### Review Checklist
- ✅ No hardcoded credentials or API keys
- ✅ Environment variables used for secrets
- ✅ Error handling with meaningful messages
- ✅ Pure functions where possible (no unnecessary side effects)
- ✅ Input validation for external data
- ✅ Comments explain "why" not "what"
- ✅ Code follows naming conventions

### Review Priorities
1. **Security**: No exposed secrets, proper input validation
2. **Readability**: Clear naming, meaningful comments, logical structure
3. **Maintainability**: Modular code, single responsibility, testable

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

// Error handling example
try {
  const card = await trelloClient.createCard(cardData);
  console.log(`✅ Created card: ${card.name}`);
} catch (error) {
  console.error(`❌ Failed to create card: ${error.message}`);
  throw new Error(`Card creation failed: ${error.message}`);
}
```


