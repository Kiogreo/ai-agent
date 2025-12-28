# Agent Guidelines

## Repository Context
**Purpose**: OpenAgents framework for AI-assisted development with Trello/GitHub MCP integration  
**Type**: AI agent development environment with Model Context Protocol (MCP) servers  
**Structure**: `.opencode/` (agents, commands, context), `.output/` (temp outputs), `.github/` (workflows)  
**Tech Stack**: OpenCode CLI, MCP (Trello/GitHub), Markdown agents, JSONC config  
**Model**: `anthropic/claude-sonnet-4-5` (configured in `opencode.jsonc`)

## ✅ Security Status
**SECURE**: All credentials properly configured with environment variables. No hardcoded secrets found.

## Build/Test Commands

### OpenCode CLI
```bash
# Start agents
opencode --agent openagent              # Universal agent (general tasks, questions)
opencode --agent opencoder              # Development specialist (complex coding)
opencode --agent system-builder         # System architect (generate AI systems)

# Run commands
/commit                                 # Smart git commits with conventional format
/test                                   # Run testing workflows
/optimize                               # Code optimization analysis
/clean                                  # Cleanup operations
/context                                # Context management
/validate-repo                          # Validate repository consistency

# Check version
opencode --version
```

### Agent Development
```bash
# Install dependencies (if using Bun runtime)
cd .opencode && bun install

# Validate agent structure
# Check: YAML frontmatter + markdown structure

# Test agent
opencode --agent <agent-name>           # Manual testing in real scenarios

# Validate repository
/validate-repo                          # Checks agents, context, commands consistency
```

### MCP Servers
```bash
# Trello MCP: Configured in opencode.jsonc with API credentials
# GitHub MCP: Docker-based, requires GITHUB_PERSONAL_ACCESS_TOKEN
# Test MCP: Use agent commands that interact with Trello/GitHub APIs
```

## Code Style Guidelines

### Markdown Agents (.opencode/agent/)
**File Naming**: `kebab-case.md` (e.g., `openagent.md`, `task-manager.md`)

**YAML Frontmatter** (required):
```yaml
---
id: agent-name
name: Agent Name
description: "Clear description with usage examples"
mode: primary|subagent
temperature: 0.2
tools:
  read: true
  write: true
  bash: true
---
```

**Structure** (in order):
1. Role statement (clear identity and purpose)
2. Core responsibilities (what the agent does)
3. Output structure (expected deliverables)
4. Quality standards (validation criteria)
5. Process workflow (step-by-step execution)
6. Usage examples (user/assistant dialogue)

**Model**: Always `anthropic/claude-sonnet-4-5`

### Context Files (.opencode/context/)
**Location**:
- `core/` - Universal patterns (essential-patterns.md, standards/, workflows/)
- `project/` - Project-specific patterns (project-context.md)

**Standards**: `core/standards/` (code.md, docs.md, tests.md, patterns.md, analysis.md)  
**Workflows**: `core/workflows/` (delegation.md, review.md, sessions.md, task-breakdown.md)

**Format**: Markdown with clear sections, code examples, anti-patterns  
**Auto-Loading**: Agents load relevant context before execution

### Commands (.opencode/command/)
**Format**: Markdown with YAML frontmatter + detailed instructions  
**Invocation**: `/command-name` in OpenCode CLI  
**Structure**: Description, arguments, examples, step-by-step process

### JavaScript/Node.js (if adding scripts)
**Imports**: Node.js built-ins → third-party → local (alphabetically)

**Naming**:
- Files: `kebab-case.js`
- Functions: `camelCase` (e.g., `processData`, `validateInput`)
- Constants: `UPPER_SNAKE_CASE`
- Classes: `PascalCase`

**Functions**: Pure functions preferred (same input = same output, no side effects)

**Async/Await**: Use async/await over promises

**Error Handling**: Try/catch with specific error types, meaningful messages
```javascript
// ✅ Good
try {
  const data = await fetchData();
  return { success: true, data };
} catch (error) {
  return { success: false, error: error.message };
}

// ❌ Bad
const data = await fetchData(); // No error handling
```

## Core Coding Patterns

### Pure Functions (ALWAYS use)
```javascript
// ✅ Pure - same input = same output, no side effects
const add = (a, b) => a + b;
const formatUser = (user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` });

// ❌ Impure - side effects
let total = 0;
const addToTotal = (value) => { total += value; return total; };
```

### Immutability (ALWAYS use)
```javascript
// ✅ Immutable - create new data
const addItem = (items, item) => [...items, item];
const updateUser = (user, changes) => ({ ...user, ...changes });

// ❌ Mutable - modifies existing data
const addItem = (items, item) => { items.push(item); return items; };
```

### Composition (prefer over inheritance)
```javascript
// ✅ Compose small functions
const processUser = pipe(validateUser, enrichUserData, saveUser);

// ❌ Deep inheritance
class ExtendedUserManagerWithValidation extends UserManager { }
```

### Small Functions (< 50 lines)
```javascript
// ✅ Small, focused
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const normalizeEmail = (email) => email.toLowerCase().trim();

// ❌ Large, unfocused
function processUserData(user) {
  // 100+ lines of mixed concerns
}
```

## Security Best Practices

### Environment Variables (CRITICAL)
```bash
# ✅ ALWAYS use environment variables for secrets
TRELLO_API_KEY=your_api_key_here
TRELLO_TOKEN=your_token_here
GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here

# ❌ NEVER hardcode credentials
const API_KEY = "abc123"; // WRONG!
```

**Configuration** (`opencode.jsonc`):
```jsonc
{
  "environment": {
    "TRELLO_API_KEY": "${env:TRELLO_API_KEY}",
    "TRELLO_TOKEN": "${env:TRELLO_TOKEN}"
  }
}
```

### Input Validation (ALWAYS)
```javascript
// ✅ Validate all external data
function processInput(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input: expected object');
  }
  // Process validated data
}

// ❌ No validation
function processInput(data) {
  return data.value; // Could crash if data is null/undefined
}
```

### Logging (NEVER log secrets)
```javascript
// ✅ Safe logging
logger.info('User authenticated', { userId: user.id });

// ❌ Exposes secrets
logger.info('Auth token', { token: user.token }); // WRONG!
```

## Agent Development Standards

### Agent Categories (.opencode/agent/)
- **core/**: Main user-facing agents (openagent, opencoder)
- **meta/**: Meta-level agents (system-builder)
- **subagents/**: Specialized helpers (task-manager, tester, reviewer, etc.)
- **development/**: Domain specialists (frontend, backend, devops)
- **content/**: Content creation (copywriter, technical-writer)

### Context Loading Pattern
Agents automatically load context before execution:
- Code tasks → `.opencode/context/core/standards/code.md`
- Docs tasks → `.opencode/context/core/standards/docs.md`
- Tests tasks → `.opencode/context/core/standards/tests.md`
- Review tasks → `.opencode/context/core/workflows/review.md`

## MCP Integration Patterns

### Trello MCP Usage
```javascript
// Agents can call Trello MCP functions:
// - trello-mcp_get_lists
// - trello-mcp_get_cards_by_list_id
// - trello-mcp_add_card_to_list
// - trello-mcp_update_card_details
// - trello-mcp_move_card
// - trello-mcp_archive_card
```

### GitHub MCP Usage
```javascript
// Agents can call GitHub MCP functions:
// - github_create_pull_request
// - github_list_issues
// - github_create_or_update_file
// - github_search_code
// - github_merge_pull_request
```

## Pull Request Guidelines

### PR Template
**Location**: `.github/pull_request_template.md`

**Required Sections**:
- Feature Type (New Agent, Agent Enhancement, Documentation, Infrastructure)
- Description (what changed and why)
- Test Summary (how it was tested)
- Screenshot (optional, for UI changes)

### Review Checklist
- ✅ No hardcoded credentials (use environment variables)
- ✅ Agent YAML frontmatter complete (description, mode, tools)
- ✅ Context files updated (if patterns changed)
- ✅ Commands follow markdown structure
- ✅ Security best practices followed
- ✅ Documentation updated

## Quick Reference

### Starting Development
```bash
# Universal agent (general tasks, questions, coordination)
opencode --agent openagent

# Development specialist (complex coding, refactoring)
opencode --agent opencoder

# System builder (generate custom AI systems)
opencode --agent system-builder

# Use commands
/commit          # Smart git commits
/test            # Run tests
/optimize        # Code optimization
/clean           # Cleanup operations
/context         # Context management
/validate-repo   # Validate repository structure
```

### Common Patterns
```javascript
// Pure function pattern (from code.md)
const add = (a, b) => a + b;
const formatUser = (user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` });

// Immutability pattern
const addItem = (items, item) => [...items, item];
const updateUser = (user, changes) => ({ ...user, ...changes });

// Error handling pattern
function parseJSON(text) {
  try {
    return { success: true, data: JSON.parse(text) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### Environment Variables
```bash
# Required for MCP servers
TRELLO_API_KEY=your_api_key
TRELLO_TOKEN=your_token
TRELLO_WORKSPACE_ID=your_workspace_id
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token

# Optional for plugins/tools
GEMINI_API_KEY=your_gemini_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Additional Resources

- **OpenAgents README**: `.opencode/README.md` - Complete framework documentation
- **Essential Patterns**: `.opencode/context/core/essential-patterns.md` - Core coding patterns
- **Code Standards**: `.opencode/context/core/standards/code.md` - Modular, functional, maintainable code
- **OpenCode Docs**: https://opencode.ai/docs
- **Trello API**: https://developer.atlassian.com/cloud/trello/rest/
- **GitHub API**: https://docs.github.com/en/rest
