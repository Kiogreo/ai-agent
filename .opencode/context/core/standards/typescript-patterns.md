# TypeScript Patterns & Examples

## Import Organization

```typescript
// 1. Type imports first
import type { Plugin } from "@opencode-ai/plugin"

// 2. External dependencies
import { tool } from "@opencode-ai/plugin/tool"
import { readFile } from "fs/promises"

// 3. Internal modules (relative imports)
import { getApiKey } from "../env"

// 4. Constants after imports
const ENABLED = false
```

## Type Definitions

```typescript
// ✅ Interfaces for object shapes
interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
}

// ✅ Types for unions/aliases
type EventType = "session.idle" | "message.updated"

// ✅ Explicit return types for public functions
export async function generateImage(
  prompt: string, 
  config: ImageConfig = {}
): Promise<string>
```

## Naming Conventions

```typescript
// ✅ Functions: verbPhrases
getApiKey()
loadEnvVariables()
parseJSON()

// ✅ Predicates: is/has/can prefix
isTestMode()
hasPermission()
canAccess()

// ✅ Variables: camelCase
const userCount = 10
const apiKey = "..."

// ✅ Constants: UPPER_SNAKE_CASE
const DEFAULT_ENV_PATHS = ['.env', '.env.local']
const ENABLED = false
```

## Error Handling Patterns

### Result Pattern (Preferred)

```typescript
function parseJSON(text: string) {
  try {
    return { success: true, data: JSON.parse(text) }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Usage
const result = parseJSON(input)
if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

### Helpful Error Messages

```typescript
async function getApiKey(apiKeyName: string): Promise<string> {
  const value = await getEnvVariable(apiKeyName)
  if (!value) {
    throw new Error(`${apiKeyName} not found. Please set it in your environment or .env file.

To fix this:
1. Add to .env file: ${apiKeyName}=your_value_here
2. Or export it: export ${apiKeyName}=your_value_here`)
  }
  return value
}
```

### Test Mode Pattern

```typescript
function isTestMode(): boolean {
  return process.env.GEMINI_TEST_MODE === 'true'
}

// Usage in code
if (isTestMode()) {
  return mockResponse()
}
return await actualApiCall()
```

## Security Patterns

### Environment Variables

```typescript
// ✅ ALWAYS use environment variables for secrets
const apiKey = await getApiKey('GEMINI_API_KEY')

// ❌ NEVER hardcode credentials
const apiKey = "sk-1234567890"  // FORBIDDEN

// ❌ NEVER log secrets
console.log(`API Key: ${apiKey}`)  // FORBIDDEN
```

### Input Validation

```typescript
async function editImage(imagePath: string, prompt: string): Promise<string> {
  // Validate required inputs
  if (!imagePath) throw new Error("imagePath is required")
  if (!prompt) throw new Error("prompt is required")
  
  // Validate file exists
  const fileExists = await Bun.file(imagePath).exists()
  if (!fileExists) throw new Error(`File not found: ${imagePath}`)
  
  // Proceed with operation
  // ...
}
```

## Anti-Patterns to Avoid

### Mutation → Immutability

```typescript
// ❌ BAD: Mutation
const addItem = (items, item) => { 
  items.push(item)
  return items 
}

// ✅ GOOD: Immutability
const addItem = (items, item) => [...items, item]
```

### Side Effects → Pure Functions

```typescript
// ❌ BAD: Side effect
function calculateTotal(items) {
  console.log('Calculating...')  // Side effect!
  return items.reduce((sum, i) => sum + i.price, 0)
}

// ✅ GOOD: Pure function
function calculateTotal(items) {
  return items.reduce((sum, i) => sum + i.price, 0)
}
```

### Deep Nesting → Early Returns

```typescript
// ❌ BAD: Deep nesting
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      // Do something
    }
  }
}

// ✅ GOOD: Early returns
if (!user) return null
if (!user.isActive) return null
if (!user.hasPermission) return null
// Do something
```

### Large Functions → Small Functions

```typescript
// ❌ BAD: Large function (>50 lines)
function processOrder(order) {
  // 100 lines of code
}

// ✅ GOOD: Small, focused functions
function validateOrder(order) { /* ... */ }
function calculateTotal(order) { /* ... */ }
function applyDiscounts(order) { /* ... */ }
function processPayment(order) { /* ... */ }

function processOrder(order) {
  validateOrder(order)
  const total = calculateTotal(order)
  const discounted = applyDiscounts(order)
  return processPayment(discounted)
}
```

## Bun-Specific Patterns

### File Operations

```typescript
// Read file
const file = Bun.file(path)
const content = await file.text()

// Write file
await Bun.write(path, content)

// Check if file exists
const exists = await Bun.file(path).exists()
```

### Direct Execution

```bash
# No build step needed - TypeScript runs directly
bun run .opencode/tool/gemini/index.ts

# Test mode
GEMINI_TEST_MODE=true bun test
```

## Pre-Commit Checklist

- [ ] No hardcoded credentials
- [ ] Functions < 50 lines
- [ ] Explicit error handling
- [ ] TypeScript types defined
- [ ] No console.log of secrets
- [ ] Pure functions where possible
- [ ] Early returns instead of deep nesting
