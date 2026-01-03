# Tool Development

## OVERVIEW
TypeScript tool implementations: env variable management, Gemini AI integration.

## STRUCTURE
```
tool/
├── env/
│   └── index.ts           # Environment variable loader
├── gemini/
│   └── index.ts           # Gemini AI image generation
├── mcp-validator/
│   ├── index.ts           # MCP credential validator
│   └── README.md          # Validator documentation
├── package.json           # Dependencies
└── README.md              # Setup guide
```

## WHERE TO LOOK

| Tool | Location | Purpose |
|------|----------|---------|
| Env loader | `env/index.ts` | Load .env files, get variables |
| Gemini AI | `gemini/index.ts` | Generate/edit images with AI |
| MCP validator | `mcp-validator/index.ts` | Validate MCP server credentials |

## CONVENTIONS

**Tool Structure:**
```typescript
// env/index.ts pattern
export async function getEnvVariable(name: string): Promise<string | undefined>
export async function loadEnvVariables(paths?: string[]): Promise<void>

// gemini/index.ts pattern
export async function generateImage(prompt: string, config?: ImageConfig): Promise<string>
export async function editImage(imagePath: string, prompt: string): Promise<string>
```

**Guidelines:**
- Bun runtime (no build step)
- TypeScript strict mode
- Explicit return types
- Environment variables for config
- Test mode support (GEMINI_TEST_MODE=true)

**Error Handling:**
```typescript
// Result pattern preferred
return { success: true, data: result }
return { success: false, error: message }

// Helpful error messages
throw new Error(`${apiKeyName} not found. Please set it in .env file.

To fix:
1. Add to .env: ${apiKeyName}=your_value
2. Or export: export ${apiKeyName}=your_value`)
```

## ANTI-PATTERNS

- **Hardcoded credentials** → Use environment variables
- **Side effects** → Pure functions
- **Missing types** → Explicit TypeScript types
- **No test mode** → Support mocking for tests

## UNIQUE STYLES

**Bun-Specific:**
```typescript
// File operations
const file = Bun.file(path)
await Bun.write(path, content)

// Direct execution (no build)
bun run tool/gemini/index.ts
```

**Environment Pattern:**
```typescript
// Load from multiple paths
const DEFAULT_ENV_PATHS = ['.env', '.env.local']
await loadEnvVariables(DEFAULT_ENV_PATHS)

// Get with validation
const apiKey = await getApiKey('GEMINI_API_KEY')
```

## NOTES

**Dependencies:**
- Managed in tool/package.json
- Install: `cd .opencode && bun install`
- Bun runtime recommended (npm/pnpm/yarn also work)

**Integration:**
- Tools used by agents via imports
- Environment variables in root .env
- Configuration in opencode.jsonc

**Testing:**
```bash
GEMINI_TEST_MODE=true bun test
```
