# Agent Guidelines

## Repository Context
**Purpose**: Trello automation tool for Casa Tropicana A-7-7 bill management with OpenAgents framework integration
**Type**: Hybrid project - JavaScript automation scripts + AI agent development environment
**Structure**: Root (Trello automation), `.opencode/` (OpenAgents framework), `.output/` (temp AI outputs)
**Tech Stack**: Node.js/JavaScript, Trello API, GitHub Actions, OpenCode CLI, MCP (Model Context Protocol)
**Config**: Default model `anthropic/claude-sonnet-4-5` in `opencode.jsonc`

## Build/Test Commands

### Trello Automation (Root Level)
- **Install**: No package.json at root - automation uses GitHub Actions runtime
- **Local Setup**: Create `.env` file with `TRELLO_API_KEY` and `TRELLO_TOKEN`
- **Test Locally**: N/A - scripts run via GitHub Actions workflow
- **Manual Trigger**: GitHub Actions → "Trello Bills Automation" → "Run workflow"
- **View Logs**: GitHub Actions → Select workflow run → "create-bills-cards" job
- **Schedule**: Daily at 1:00 AM UTC (configured in `.github/workflows/trello-automation.yml`)

### OpenAgents Framework (.opencode/)
- **Install**: `cd .opencode && bun install`
- **Start Agent**: `opencode --agent openagent` (universal coordinator)
- **Development**: `opencode --agent opencoder` (complex coding tasks)
- **Commands**: `/commit`, `/test`, `/optimize`, `/clean`, `/context`
- **Validation**: Manual review + testing agents in real usage scenarios

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

### JavaScript/Node.js Conventions
- **Imports**: Node.js built-ins → third-party packages → local modules (alphabetically within groups)
- **Naming**: 
  - Files: `kebab-case.js` (e.g., `create-bills-cards.js`)
  - Variables/Functions: `camelCase` (e.g., `calculateDueDate`, `createCard`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `TRELLO_API_KEY`, `DRY_RUN`)
  - Classes: `PascalCase` (e.g., `TrelloClient`, `CardBuilder`)
- **Functions**: Pure functions preferred - same input = same output, no side effects
- **Async/Await**: Use async/await over promises for readability
- **Error Handling**: Try/catch with specific error types, meaningful messages with context

### Security Best Practices
- **Secrets**: ALWAYS use environment variables - NEVER commit credentials
- **Input Validation**: Validate all external data (API responses, config files)
- **Sanitization**: Escape user input before logging or displaying
- **API Keys**: Store in GitHub Secrets for Actions, `.env` for local (gitignored)
- **Logging**: NEVER log sensitive data (tokens, API keys, passwords)

### Code Structure
- **Modularity**: Single responsibility per function (< 50 lines ideal)
- **Pure Functions**: Avoid side effects, return new data instead of mutating
- **Comments**: Explain "why" not "what" - focus on business logic and decisions
- **Error Messages**: Actionable and specific (e.g., "Template card 'Monthly Bills' not found in TEMPLATE list")

### Testing Patterns
- **Dry Run**: Test mode that simulates operations without API calls
- **Logging**: Detailed logs for debugging (card names, dates, API responses)
- **Validation**: Check config before execution, fail fast on invalid data
- **Manual Testing**: Trigger workflows manually before relying on schedule

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

## GitHub Actions Workflow

### Automation Workflow
- **File**: `.github/workflows/trello-automation.yml`
- **Trigger**: Scheduled (cron) + manual dispatch
- **Environment**: GitHub Actions runner with Node.js
- **Secrets**: `TRELLO_API_KEY`, `TRELLO_TOKEN` stored in GitHub Secrets
- **Logs**: Viewable in Actions tab for debugging

### Workflow Best Practices
- **Cron Syntax**: Use https://crontab.guru/ to validate schedules
- **Manual Triggers**: Always enable `workflow_dispatch` for testing
- **Error Handling**: Fail workflow on critical errors, warn on non-critical
- **Notifications**: Consider adding Slack/email notifications for failures

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
- ✅ Code follows naming conventions (camelCase, kebab-case, etc.)
- ✅ Agent YAML frontmatter complete (if agent PR)
- ✅ Context files updated (if patterns changed)

### Review Priorities
1. **Security**: No exposed secrets, proper input validation
2. **Readability**: Clear naming, meaningful comments, logical structure
3. **Maintainability**: Modular code, single responsibility, testable
4. **Performance**: Efficient API usage, avoid unnecessary calls

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

// Environment variable usage
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
if (!TRELLO_API_KEY) {
  throw new Error('Missing required environment variable: TRELLO_API_KEY');
}
```

### Context Loading (Agents)
```markdown
# Agents automatically load context before execution:
- Code tasks → .opencode/context/core/standards/code.md
- Docs tasks → .opencode/context/core/standards/docs.md
- Tests tasks → .opencode/context/core/standards/tests.md
- Review tasks → .opencode/context/core/workflows/review.md
```

## Additional Resources

- **OpenAgents README**: `.opencode/README.md` - Complete framework documentation
- **Essential Patterns**: `.opencode/context/core/essential-patterns.md` - Core coding patterns
- **Trello API Docs**: https://developer.atlassian.com/cloud/trello/rest/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **OpenCode CLI Docs**: https://opencode.ai/docs
