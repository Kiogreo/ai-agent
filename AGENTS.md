# CODING AGENT GUIDE

**Runtime:** Bun | **Language:** TypeScript | **Philosophy:** Modular, Functional, Secure  
**Project:** OpenCode Plugin Development with MCP Integration

---

## 🚀 QUICK COMMANDS

```bash
# Development
cd .opencode && bun install                    # Install dependencies
bun run .opencode/tool/gemini/index.ts         # Run TypeScript directly
bun --watch .opencode/tool/gemini/index.ts     # Watch mode
bun tsc --noEmit                               # Type check only

# Testing
bun test                                       # Run all tests
bun test path/to/file.test.ts                  # Run single test file
bun test --test-name-pattern "pattern"         # Run tests matching pattern
GEMINI_TEST_MODE=true bun test                 # Run with mocked API calls

# Validation
/validate-repo                                 # Validate repository structure
/clean                                         # Cleanup operations
opencode --agent openagent                     # Start universal agent
```

---

## 📝 CODE STYLE

### Import Order
```typescript
import type { Plugin } from "@opencode-ai/plugin"    // 1. Type imports
import { tool } from "@opencode-ai/plugin/tool"      // 2. External deps
import { getApiKey } from "../env"                   // 3. Internal modules
const ENABLED = false                                // 4. Constants
```

### Naming Conventions
- **Files**: `lowercase-with-dashes.ts`
- **Functions**: `verbPhrases` (getApiKey, loadEnvVariables, parseJSON)
- **Predicates**: `is/has/can` prefix (isTestMode, hasPermission, canAccess)
- **Variables**: `camelCase` (userCount, apiKey, imageConfig)
- **Constants**: `UPPER_SNAKE_CASE` (DEFAULT_ENV_PATHS, ENABLED)
- **Interfaces**: `PascalCase` (ImageConfig, EnvLoaderConfig)

### Type Definitions
```typescript
// Always define interfaces for config objects
interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
}

// Use explicit return types for public functions
export async function generateImage(prompt: string, config: ImageConfig = {}): Promise<string>
```

### Error Handling
```typescript
// ✅ Helpful error messages with actionable steps
async function getApiKey(name: string): Promise<string> {
  const value = await getEnvVariable(name)
  if (!value) {
    throw new Error(`${name} not found. Please set it in your environment or .env file.

To fix this:
1. Add to .env file: ${name}=your_value_here
2. Or export it: export ${name}=your_value_here`)
  }
  return value
}

// ✅ Early returns (avoid deep nesting)
if (!user) return null
if (!user.isActive) return null
return processUser(user)

// ✅ Try-catch in tool execute functions
async execute(args, context) {
  try {
    return await generateImage(args.prompt, config)
  } catch (error) {
    return `Error: ${error.message}`
  }
}
```

---

## 🔒 SECURITY (CRITICAL)

```typescript
// ✅ ALWAYS use environment variables for secrets
const apiKey = await getApiKey('GEMINI_API_KEY')

// ❌ NEVER hardcode credentials
const apiKey = "sk-1234567890"  // FORBIDDEN

// ❌ NEVER log secrets
console.log(`API Key: ${apiKey}`)  // FORBIDDEN

// ✅ Test mode pattern for API calls
function isTestMode(): boolean {
  return process.env.GEMINI_TEST_MODE === 'true'
}

async function callExternalAPI() {
  if (isTestMode()) {
    return mockResponse()  // Return mock data
  }
  return await actualApiCall()  // Real API call
}
```

---

## 🎯 CORE PATTERNS

### Pure Functions & Immutability
```typescript
// ✅ Pure function
const add = (a: number, b: number) => a + b

// ✅ Immutable operations
const addItem = (items: Item[], item: Item) => [...items, item]
const updateUser = (user: User, changes: Partial<User>) => ({ ...user, ...changes })

// ❌ Avoid mutation
const addItem = (items: Item[], item: Item) => { items.push(item); return items }
```

### Small Functions (< 50 lines)
```typescript
// ✅ Break into focused functions
async function getUniqueFilename(directory: string, baseName: string, extension: string): Promise<string> {
  await ensureDirectoryExists(directory)
  const baseFilename = join(directory, `${baseName}${extension}`)
  const fileExists = await Bun.file(baseFilename).exists()
  
  if (!fileExists) return baseFilename
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  return join(directory, `${baseName}_${timestamp}${extension}`)
}
```

---

## 🛠️ PROJECT-SPECIFIC PATTERNS

### Bun File Operations
```typescript
const file = Bun.file(path)
const content = await file.text()           // Read
await Bun.write(path, content)              // Write
const exists = await Bun.file(path).exists() // Check existence
const stats = await Bun.file(path).stat()   // Get file stats
```

### Tool Definition Pattern
```typescript
import { tool } from "@opencode-ai/plugin/tool"

export const myTool = tool({
  description: "Brief description of what this tool does",
  args: {
    prompt: tool.schema.string().describe("Description of argument"),
    optional: tool.schema.string().optional().describe("Optional argument"),
  },
  async execute(args, context) {
    try {
      // Implementation
      return "Success message"
    } catch (error) {
      return `Error: ${error.message}`
    }
  },
})
```

### Environment Variable Loading
```typescript
import { getApiKey, getEnvVariable } from "../env"

// For required API keys
const apiKey = await getApiKey('GEMINI_API_KEY')

// For optional variables
const value = await getEnvVariable('OPTIONAL_VAR')

// Automatically searches: ./.env, ../.env, ../../.env, ../plugin/.env
```

### Test Mode Pattern
```typescript
function isTestMode(): boolean {
  return process.env.GEMINI_TEST_MODE === 'true'
}

async function generateImage(prompt: string, config: ImageConfig = {}): Promise<string> {
  const apiKey = await getGeminiApiKey()
  
  if (isTestMode()) {
    return `[TEST MODE] Would generate image for prompt: "${prompt}"`
  }
  
  // Real API call
  const res = await fetch(apiUrl, { headers: { "x-goog-api-key": apiKey } })
  // ...
}
```

---

## 🧪 TESTING STANDARDS

### AAA Pattern (Arrange-Act-Assert)
```typescript
test('getUniqueFilename adds timestamp when file exists', async () => {
  // Arrange
  const directory = '/tmp/test'
  const baseName = 'image'
  const extension = '.png'
  
  // Act
  const result = await getUniqueFilename(directory, baseName, extension)
  
  // Assert
  expect(result).toMatch(/image_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.png/)
})
```

### What to Test
- ✅ Happy path (normal usage)
- ✅ Edge cases (empty, null, undefined)
- ✅ Error cases (invalid input, API failures)
- ✅ Business logic (core functionality)
- ❌ Third-party libraries, framework internals

---

## ✅ PRE-COMMIT CHECKLIST

- [ ] No hardcoded credentials or secrets
- [ ] Functions < 50 lines
- [ ] Explicit error handling with helpful messages
- [ ] TypeScript types defined for public APIs
- [ ] No console.log of sensitive data
- [ ] Pure functions where possible
- [ ] Early returns instead of deep nesting
- [ ] Test mode support for external API calls

---

## 📚 QUICK REFERENCE

**Naming:**
- Files: `lowercase-with-dashes.ts`
- Functions: `verbPhrases` (getUser, validateEmail)
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `PascalCase`

**Golden Rule:** If you can't easily test it, refactor it

**Context Files:**
- `.opencode/context/core/standards/code.md` - Code standards
- `.opencode/context/core/standards/typescript-patterns.md` - TypeScript patterns
- `.opencode/context/core/standards/tests.md` - Test patterns
