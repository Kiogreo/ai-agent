# CODING AGENT GUIDE

**Runtime:** Bun | **Language:** TypeScript | **Philosophy:** Modular, Functional, Secure  
**Project Type:** OpenCode Plugin Development with MCP Integration

---

## 🚀 BUILD/LINT/TEST COMMANDS

### Development
```bash
cd .opencode && bun install                    # Install dependencies
bun run .opencode/tool/gemini/index.ts         # Run TypeScript directly (no build needed)
bun tsc --noEmit                               # Type check only
bun --watch .opencode/tool/gemini/index.ts     # Watch mode for development
```

### Testing
```bash
bun test                                       # Run all tests
bun test path/to/file.test.ts                  # Run single test file
bun test --test-name-pattern "pattern"         # Run tests matching pattern
GEMINI_TEST_MODE=true bun test                 # Run with mocked API calls (no real API usage)
```

### Validation & Cleanup
```bash
/validate-repo    # Validate repository structure and configuration
/clean            # Cleanup operations
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
- **Predicates**: `is/has/can` prefix (isTestMode, hasPermission)
- **Variables**: `camelCase` (userCount, apiKey)
- **Constants**: `UPPER_SNAKE_CASE` (DEFAULT_ENV_PATHS, ENABLED)

### Type Definitions
```typescript
interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
}

export async function generateImage(prompt: string, config: ImageConfig = {}): Promise<string>
```

### Error Handling
```typescript
// ✅ Result pattern (preferred)
function parseJSON(text: string) {
  try {
    return { success: true, data: JSON.parse(text) }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

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

if (isTestMode()) {
  return mockResponse()
}
return await actualApiCall()
```

---

## 🎯 CORE PATTERNS

### Pure Functions (no side effects)
```typescript
// ✅ Pure
const add = (a: number, b: number) => a + b
const formatUser = (user: User) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` })

// ❌ Impure
let total = 0
const addToTotal = (value: number) => { total += value; return total }
```

### Immutability (don't modify, create new)
```typescript
// ✅ Immutable
const addItem = (items: Item[], item: Item) => [...items, item]
const updateUser = (user: User, changes: Partial<User>) => ({ ...user, ...changes })

// ❌ Mutable
const addItem = (items: Item[], item: Item) => { items.push(item); return items }
```

### Small Functions (< 50 lines)
```typescript
// ✅ Break into focused functions
function validateOrder(order: Order) { /* ... */ }
function calculateTotal(order: Order) { /* ... */ }
function processPayment(order: Order) { /* ... */ }

function processOrder(order: Order) {
  validateOrder(order)
  const total = calculateTotal(order)
  return processPayment(order)
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

### Plugin Definition Pattern
```typescript
import type { Plugin } from "@opencode-ai/plugin"

const ENABLED = false  // Feature flag

export const MyPlugin: Plugin = async ({ $ }) => {
  if (!ENABLED) return {}
  
  return {
    async event(input) {
      if (input.event.type === "session.idle") {
        // Handle event
      }
    },
  }
}
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

### Test Mode Pattern (for API calls)
```typescript
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

## ❌ ANTI-PATTERNS (AVOID)

| Don't | Do |
|-------|-----|
| Mutation | Immutability |
| Side effects | Pure functions |
| Deep nesting | Early returns |
| Large functions (>50 lines) | Small, focused functions |
| Hardcoded credentials | Environment variables |
| Hidden dependencies | Dependency injection |

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

**Golden Rule:** If you can't easily test it, refactor it

**Context Files:**
- `.opencode/context/core/standards/code.md` - Code standards
- `.opencode/context/core/standards/typescript-patterns.md` - TypeScript patterns
- `.opencode/context/core/standards/tests.md` - Test patterns
