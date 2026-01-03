# 🤖 AI Agent Development Environment

AI-powered development workspace with OpenAgents framework, Trello/GitHub MCP integration, and intelligent code generation.

## 🎯 What This Is

This repository provides a complete AI agent development environment powered by **OpenCode CLI** with:

- **17 AI Agents** - Specialized agents for coding, testing, documentation, and more
- **9 Commands** - Slash commands for common development tasks
- **Trello Integration** - AI agents can interact with Trello boards via MCP
- **GitHub Integration** - AI agents can manage repositories, PRs, and issues
- **Context-Aware** - Agents follow your coding standards and patterns

## ✨ Key Features

- 🤖 **AI-Assisted Development** - Let agents write, test, and review code
- 🎯 **Multi-Model Support** - Choose between Claude and GLM-4.6 based on task needs
- 📋 **Trello MCP Integration** - Manage Trello boards through AI chat
- 🔧 **GitHub MCP Integration** - Automate GitHub operations via AI
- 📚 **Context-Aware** - Agents automatically follow your coding patterns
- 🔒 **Secure** - Credentials stored in environment variables
- 🎨 **Customizable** - Add your own agents, commands, and patterns

## 🚀 Quick Start

### Prerequisites

1. **Install OpenCode CLI**
   ```bash
   # Follow official installation guide
   https://opencode.ai/docs
   ```

2. **Set up environment variables**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit .env and add your credentials
   nano .env
   ```

### Get Trello Credentials

1. **API Key**: Visit https://trello.com/app-key
2. **Token**: Click "Token" link on the same page
3. **Workspace ID**: Find in Trello board URL or settings

### Get GitHub Token

1. Visit https://github.com/settings/tokens
2. Generate new token with `repo`, `read:org`, `read:user` scopes
3. Add to `.env` file

### Get Ollama Cloud API Key (Optional)

1. **Visit**: https://ollama.cloud and sign up/login
2. **Navigate**: Account → API Keys
3. **Generate**: Create new API key for cloud access
4. **Copy**: Save the generated key for your `.env` file

**Note**: Ollama Cloud provides GLM-4.6 as a secondary LLM model option alongside the default Claude model.

### Start Using Agents

```bash
# Start the universal agent (recommended)
opencode --agent openagent

# Use default model (Claude)
> "Create a React component with TypeScript"

# Use GLM-4.6 model (Ollama Cloud)
opencode --model ollama-cloud/glm-4.6 --agent openagent
> "Create a React component with TypeScript"

# Add a card to my Trello board
> "Add a card to my Trello board"

# Review this code for security issues
> "Review this code for security issues"
```

## 🤖 Available Agents

### Core Agents (User-Facing)

- **openagent** - Universal coordinator for general tasks and questions
- **opencoder** - Specialized development agent for complex coding
- **system-builder** - Meta-level generator for custom AI architectures

### Specialized Subagents (Auto-Delegated)

**Core Coordination:**
- **task-manager** - Task breakdown and planning
- **documentation** - Documentation authoring

**Code Specialists:**
- **coder-agent** - Quick implementation tasks
- **reviewer** - Code review and security analysis
- **tester** - Test creation and validation
- **build-agent** - Build and type checking
- **codebase-pattern-analyst** - Pattern discovery

**Utilities:**
- **image-specialist** - Image generation with Gemini AI

**System Builder (Meta-Level):**
- **domain-analyzer** - Domain analysis and agent recommendations
- **agent-generator** - XML-optimized agent generation
- **context-organizer** - Context file organization
- **workflow-designer** - Workflow design
- **command-creator** - Custom command creation

## ⚡ Available Commands

- **/commit** - Smart git commits with conventional format
- **/test** - Testing workflows
- **/optimize** - Code optimization
- **/clean** - Cleanup operations
- **/context** - Context management
- **/validate-repo** - Validate repository consistency
- **/build-context-system** - Generate custom AI systems
- **/worktrees** - Git worktree management
- **/prompt-enhancer** - Improve your prompts

## 📋 Trello Integration Examples

### Create a Trello Card
```bash
opencode --agent openagent
> "Create a Trello card titled 'Fix login bug' in the TODO list"
```

### List Trello Cards
```bash
> "Show me all cards in my Trello board"
```

### Update Card Status
```bash
> "Move the 'Fix login bug' card to Done"
```

### Add Checklist Items
```bash
> "Add a checklist to the card with items: write tests, update docs"
```

## 🔧 GitHub Integration Examples

### Create Pull Request
```bash
opencode --agent openagent
> "Create a PR for my current branch"
```

### List Issues
```bash
> "Show me all open issues in this repository"
```

### Create Issue
```bash
> "Create an issue for the login bug with high priority"
```

## 📁 Project Structure

```
.
├── .opencode/              # OpenAgents framework
│   ├── agent/              # AI agents
│   │   ├── core/           # Main agents (openagent, opencoder)
│   │   ├── meta/           # Meta-level agents (system-builder)
│   │   └── subagents/      # Specialized helpers
│   ├── command/            # Slash commands
│   ├── context/            # Coding patterns and standards
│   │   ├── core/           # Universal patterns
│   │   └── project/        # Your project-specific patterns
│   ├── plugin/             # Optional: Telegram notifications
│   └── tool/               # Optional: Gemini AI tools
├── .env                    # Environment variables (gitignored)
├── .env.example            # Template for environment variables
├── opencode.jsonc          # OpenCode configuration
└── AGENTS.md               # Agent development guidelines
```

## ⚙️ Configuration

### OpenCode Configuration (`opencode.jsonc`)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "matrix",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true,
  "provider": {
    "ollama-cloud": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama Cloud",
      "options": {
        "baseURL": "https://api.ollama.cloud/v1",
        "apiKey": "${env:OLLAMA_CLOUD_API_KEY}"
      },
      "models": {
        "glm-4.6": {
          "name": "GLM-4.6",
          "limit": {
            "context": 128000,
            "output": 8192
          }
        }
      }
    }
  },
  "mcp": {
    "trello": {
      "enabled": true,
      "type": "local",
      "command": ["bunx", "@delorenj/mcp-server-trello"],
      "environment": {
        "TRELLO_API_KEY": "${env:TRELLO_API_KEY}",
        "TRELLO_TOKEN": "${env:TRELLO_TOKEN}",
        "TRELLO_WORKSPACE_ID": "${env:TRELLO_WORKSPACE_ID}"
      }
    },
    "github": {
      "enabled": true,
      "type": "local",
      "command": [
        "docker", "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "environment": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github_token}"
      }
    }
  }
}
```

### Environment Variables (`.env`)

```bash
# Trello MCP Server
TRELLO_API_KEY=your_api_key_here
TRELLO_TOKEN=your_token_here
TRELLO_WORKSPACE_ID=your_workspace_id_here

# GitHub MCP Server
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here

# Optional: Gemini AI (for image-specialist agent)
GEMINI_API_KEY=your_gemini_key_here

# Optional: Ollama Cloud API (secondary LLM model)
OLLAMA_CLOUD_API_KEY=your_ollama_cloud_api_key_here

# Optional: Telegram notifications
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## 🎓 Example Workflows

### Build a Feature with AI Assistance

```bash
opencode --agent openagent
> "Create a user authentication system with email/password"

# OpenAgent will:
# 1. Analyze the request
# 2. Propose implementation plan
# 3. Wait for your approval
# 4. Delegate to @task-manager for breakdown
# 5. Coordinate implementation step-by-step
# 6. Use @tester for tests and @reviewer for security
# 7. Validate, summarize, and confirm completion
```

### Smart Git Commits

```bash
# Make your changes
git add .

# Use the commit command
/commit

# Auto-generates: ✨ feat: add user authentication system
```

### Switch Between LLM Models

```bash
# Use default Claude model
opencode --agent openagent
> "Analyze this code for performance issues"

# Use GLM-4.6 model (Ollama Cloud)
opencode --model ollama-cloud/glm-4.6 --agent openagent
> "Analyze this code for performance issues"

# Compare model responses
# Claude: Detailed analysis with step-by-step reasoning
# GLM-4.6: Concise analysis with practical recommendations
```

### Add Your Coding Patterns

```bash
# Edit your project context
nano .opencode/context/project/project-context.md

# Add your patterns:
# **API Endpoint Pattern:**
# ```typescript
# export async function POST(request: Request) {
#   // Your standard pattern
# }
# ```

# Agents will automatically use these patterns!
```

## 🤖 Available LLM Models

This project supports multiple LLM models for different use cases and preferences.

### Primary Model: Claude Sonnet 4.5

- **Provider**: Anthropic
- **Strengths**: Complex reasoning, detailed analysis, step-by-step explanations
- **Use Cases**: Architecture design, code review, complex problem-solving
- **Configuration**: Default model, no additional setup required

### Secondary Model: GLM-4.6 (Ollama Cloud)

- **Provider**: Ollama Cloud
- **Strengths**: Fast responses, concise outputs, practical recommendations
- **Use Cases**: Quick code generation, straightforward tasks, performance-critical workflows
- **Configuration**: Requires `OLLAMA_CLOUD_API_KEY` in `.env` file

### Model Selection Guide

| Task Type | Recommended Model | Reason |
|-----------|------------------|--------|
| Complex Architecture | Claude | Deep reasoning capabilities |
| Code Review | Claude | Thorough analysis and explanations |
| Quick Code Generation | GLM-4.6 | Faster response times |
| Simple Questions | GLM-4.6 | Efficient and concise |
| Learning/Tutorials | Claude | Detailed explanations |
| Production Debugging | GLM-4.6 | Quick, actionable insights |

### Usage Examples

```bash
# Default model (Claude) - best for complex tasks
opencode --agent opencoder
> "Design a microservices architecture for an e-commerce platform"

# GLM-4.6 model - best for quick tasks
opencode --model ollama-cloud/glm-4.6 --agent coder-agent
> "Generate a TypeScript interface for user data"

# Switch between models based on task complexity
# Complex: Use Claude for thorough analysis
# Simple: Use GLM-4.6 for speed
```

### Manage Trello with AI

```bash
opencode --agent openagent

# Create cards
> "Create a card 'Deploy to production' in my Trello TODO list"

# Update cards
> "Add a due date of next Friday to the deployment card"

# Manage checklists
> "Add a checklist to the card: run tests, backup database, deploy"

# Move cards
> "Move the deployment card to In Progress"
```

## 🔐 Security

- ✅ **Environment Variables** - All credentials stored in `.env` (gitignored)
- ✅ **No Hardcoded Secrets** - Configuration uses `${env:VARIABLE_NAME}` references
- ✅ **MCP Security** - Trello/GitHub access controlled via MCP servers
- ✅ **Token Scopes** - Minimal required permissions for API access

### Security Best Practices

1. **Never commit `.env`** - Already in `.gitignore`
2. **Rotate credentials regularly** - Every 90 days recommended
3. **Use minimal scopes** - Only grant necessary permissions
4. **Review MCP logs** - Monitor API usage

## 🧪 Testing & Validation

### Validate Repository Structure

```bash
/validate-repo
```

This checks:
- ✅ All agents have proper YAML frontmatter
- ✅ All commands exist and are valid
- ✅ Context files are present
- ✅ Configuration is correct
- ✅ No security issues (hardcoded credentials)

### Test Trello Integration

```bash
opencode --agent openagent
> "List all my Trello boards"
```

### Test GitHub Integration

```bash
opencode --agent openagent
> "Show me my GitHub repositories"
```

## 📚 Documentation

- **AGENTS.md** - Agent development guidelines and coding standards
- **.opencode/README.md** - OpenAgents framework documentation
- **.opencode/context/** - Coding patterns and standards
  - `core/essential-patterns.md` - Universal coding patterns
  - `core/standards/code.md` - Code quality standards
  - `core/standards/docs.md` - Documentation standards
  - `core/standards/tests.md` - Testing standards
  - `project/project-context.md` - Your project-specific patterns

## 🛠️ Customization

### Add Your Own Agent

1. Create agent file in `.opencode/agent/`
2. Add YAML frontmatter with description and mode
3. Define agent behavior and responsibilities
4. Test with `opencode --agent your-agent-name`

### Add Your Own Command

1. Create command file in `.opencode/command/`
2. Add YAML frontmatter with description
3. Define command instructions
4. Use with `/your-command-name`

### Add Your Coding Patterns

Edit `.opencode/context/project/project-context.md`:

```markdown
## Your Pattern Name

**When to use**: Description

**Pattern**:
```language
// Your code pattern
```

**Example**:
```language
// Example usage
```
```

Agents will automatically load and follow these patterns!

## 🔧 Troubleshooting

### "Missing Trello credentials" Error

- Check `.env` file exists and has correct values
- Verify `TRELLO_API_KEY`, `TRELLO_TOKEN`, `TRELLO_WORKSPACE_ID` are set
- Ensure no extra spaces or quotes in `.env`

### "MCP server not responding"

- Check Docker is running (for GitHub MCP)
- Verify `bunx` is installed (for Trello MCP)
- Check MCP server logs in OpenCode output

### Agents not following patterns

- Verify context files exist in `.opencode/context/`
- Check YAML frontmatter in agent files
- Ensure patterns are clearly documented

### "Ollama Cloud model not available" Error

- Check `OLLAMA_CLOUD_API_KEY` is set in `.env` file
- Verify API key is valid and active
- Test connectivity: `curl -H "Authorization: Bearer $OLLAMA_CLOUD_API_KEY" https://api.ollama.cloud/v1/models`
- Ensure model name is correct: `ollama-cloud/glm-4.6`

### "GLM-4.6 model not responding"

- Check Ollama Cloud service status
- Verify API key permissions include GLM-4.6 access
- Try switching back to Claude model: `opencode --model anthropic/claude-sonnet-4-5`
- Check rate limits on your Ollama Cloud account

### Configuration errors

- Validate JSON syntax in `opencode.jsonc`
- Check environment variable references use `${env:VAR_NAME}` format
- Ensure no trailing commas in JSON

## 💡 Tips & Best Practices

### For Best Results

1. **Be specific** - Clear instructions get better results
2. **Use context** - Add your patterns to `project-context.md`
3. **Iterate** - Refine agent responses with follow-up questions
4. **Review output** - Always review AI-generated code
5. **Test thoroughly** - Use `/test` command for validation

### Recommended Workflow

1. Start with `openagent` for general tasks
2. Use `opencoder` for complex multi-file coding
3. Let agents delegate to specialists automatically
4. Review and approve plans before execution
5. Validate with `/test` and `/validate-repo`

### Model Selection Workflow

1. **Assess task complexity**: Simple vs. Complex
2. **Choose model**: GLM-4.6 for speed, Claude for depth
3. **Execute task**: Use appropriate model flag
4. **Compare results**: Switch models if needed
5. **Optimize**: Learn which model works best for each task type

## 📊 Model Performance Comparison

| Characteristic | Claude Sonnet 4.5 | GLM-4.6 (Ollama Cloud) |
|---------------|-------------------|------------------------|
| **Response Speed** | Medium | Fast |
| **Reasoning Depth** | Very High | High |
| **Code Quality** | Excellent | Very Good |
| **Context Length** | 200K tokens | 128K tokens |
| **Cost Efficiency** | Higher cost | Lower cost |
| **Best For** | Complex problems | Quick tasks |
| **Language Support** | Extensive | Strong |

### When to Use Each Model

**Use Claude when:**
- Designing system architecture
- Performing security analysis
- Writing complex algorithms
- Needing detailed explanations
- Working with ambiguous requirements

**Use GLM-4.6 when:**
- Generating boilerplate code
- Simple refactoring tasks
- Quick documentation updates
- Straightforward bug fixes
- Performance-critical workflows

## 🤝 Contributing

This is a personal development environment, but feel free to:

1. Fork and customize for your needs
2. Share your custom agents and commands
3. Report issues or suggest improvements
4. Add your own patterns and workflows

## 📝 License

MIT License - Feel free to use and modify

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review OpenCode documentation: https://opencode.ai/docs
3. Validate repository structure: `/validate-repo`
4. Check environment variables in `.env`
5. Review MCP server logs

## 🔗 Related Resources

- **OpenCode CLI**: https://opencode.ai/docs
- **Trello API**: https://developer.atlassian.com/cloud/trello/rest/
- **GitHub API**: https://docs.github.com/en/rest
- **MCP Protocol**: https://modelcontextprotocol.io/

---

**Built with ❤️ using OpenCode and AI agents**
