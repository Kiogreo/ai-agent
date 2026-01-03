# MCP Credential Validator

Validates that all enabled MCP servers in `opencode.jsonc` have the required credentials configured in your `.env` file.

## Purpose

Catch MCP configuration issues **before** starting OpenCode CLI, preventing:
- Silent MCP server failures
- Confusing error messages
- Broken integrations

## Usage

### Basic Validation

```bash
# Run from project root
bun run .opencode/tool/mcp-validator/index.ts
```

### What It Checks

1. **Enabled MCP Servers** - Only validates servers with `"enabled": true`
2. **Environment Variables** - Checks if required credentials exist in `.env` or `process.env`
3. **Placeholder Detection** - Warns if values look like placeholders (`your_api_key_here`, etc.)
4. **Dependencies** - Verifies required tools (Docker for GitHub, npx for Context7)

### Example Output

```
🔍 Validating MCP server credentials...

=== MCP Credential Validation ===

✅ Valid MCP Servers:
   ✓ canva
   ✓ github

⚠️  MCP Servers with Warnings:
   ⚠ context7
     - npx not found - Context7 MCP requires Node.js/npx

❌ Invalid MCP Servers:
   ✗ trello
     Missing credentials:
     - TRELLO_API_KEY
     - TRELLO_TOKEN

Summary:
  Total enabled: 4
  Valid: 2
  Warnings: 1
  Invalid: 1

To fix missing credentials:
1. Copy .env.example to .env if you haven't already
2. Add the missing credentials to your .env file
3. Run this validator again to verify

For trello:
  echo "TRELLO_API_KEY=your_value_here" >> .env
  echo "TRELLO_TOKEN=your_value_here" >> .env
```

## Integration

### Pre-Start Check

Add to your workflow before starting OpenCode:

```bash
# Validate MCP credentials
bun run .opencode/tool/mcp-validator/index.ts

# If validation passes, start OpenCode
opencode --agent openagent
```

### Package.json Script

```json
{
  "scripts": {
    "validate-mcp": "bun run .opencode/tool/mcp-validator/index.ts",
    "start": "bun run validate-mcp && opencode --agent openagent"
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/validate.yml
- name: Validate MCP Credentials
  run: bun run .opencode/tool/mcp-validator/index.ts
```

## Validation Rules

### Environment Variable Detection

Extracts variable names from:
- `${env:VARIABLE_NAME}` - Environment variable reference
- `${input:VARIABLE_NAME}` - Input variable reference

### Placeholder Detection

Flags values containing:
- `your_`
- `YOUR_`
- `placeholder`
- `example`
- `token_here`
- `key_here`
- `api_key_here`

### Server-Specific Checks

**GitHub MCP:**
- Checks if Docker is installed
- Validates `GITHUB_PERSONAL_ACCESS_TOKEN`

**Context7 MCP:**
- Checks if npx is installed
- Validates `CONTEXT7_API_KEY`

**Trello MCP:**
- Validates `TRELLO_API_KEY`
- Validates `TRELLO_TOKEN`
- Validates `TRELLO_WORKSPACE_ID`

## Exit Codes

- `0` - All enabled MCP servers have valid credentials
- `1` - Some MCP servers have missing/invalid credentials or validation failed

## Troubleshooting

### "Docker not found" Warning

Install Docker:
- macOS: https://docs.docker.com/desktop/install/mac-install/
- Linux: https://docs.docker.com/engine/install/
- Windows: https://docs.docker.com/desktop/install/windows-install/

### "npx not found" Warning

Install Node.js (includes npx):
- https://nodejs.org/

### Missing Credentials

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```bash
   nano .env
   ```

3. Run validator again:
   ```bash
   bun run .opencode/tool/mcp-validator/index.ts
   ```

## Development

### Running Tests

```bash
# Test with current configuration
bun run .opencode/tool/mcp-validator/index.ts

# Test with specific .env file
ENV_FILE=.env.test bun run .opencode/tool/mcp-validator/index.ts
```

### Adding New MCP Server Validation

Edit `index.ts` and add server-specific validation in the `validateMCPServer` function:

```typescript
case "your-mcp-server":
  // Add custom validation logic
  if (someCondition) {
    result.warnings.push("Your warning message")
  }
  break
```

## See Also

- [MCP Server Configuration](../../README.md#mcp-integration)
- [Environment Variables](.env.example)
- [OpenCode Documentation](https://opencode.ai/docs)
