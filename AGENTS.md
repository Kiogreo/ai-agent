# CODING AGENT GUIDE

**Project:** OpenCode AI Agent Framework  
**Stack:** TypeScript (Bun runtime), Markdown agents, MCP integrations  
**Last Updated:** 2026-01-01

This guide is for AI coding agents working in this repository. Follow these conventions strictly.

---

## 🚀 BUILD & TEST COMMANDS

### Setup & Development
```bash
cd .opencode && bun install                    # Install dependencies
bun run .opencode/tool/gemini/index.ts         # Run tool directly (no build step)
bun run .opencode/plugin/notify.ts             # Run plugin directly
```

### Testing
```bash
bun test                                       # Run all tests
bun test path/to/file.test.ts                 # Run single test file
GEMINI_TEST_MODE=true bun test                # Test mode (mocks API calls)
```

### Validation
```bash
/validate-repo                                 # Comprehensive repo validation
opencode --agent openagent                     # Start universal agent
```

---

## 📋 CODE STYLE GUIDELINES

### Core Philosophy: **Modular, Functional, Maintainable**

- ✅ Pure functions (no side effects) | ✅ Immutability | ✅ Small functions (< 50 lines) | ✅ Explicit dependencies
- ❌ Mutation | ❌ Side effects | ❌ Deep nesting | ❌ Global state

### File Naming
```
lowercase-with-dashes.ts        # TypeScript files
lowercase-with-dashes.md        # Markdown files
UPPER_CASE.md                   # Documentation (README, AGENTS)
```

### Import Organization
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

### TypeScript Conventions

```typescript
// ✅ Interfaces for object shapes
interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
}

// ✅ Types for unions/aliases
type EventType = "session.idle" | "message.updated"

// ✅ Explicit return types for public functions
export async function generateImage(prompt: string, config: ImageConfig = {}): Promise<string>

// ✅ Naming: verbPhrases (getApiKey, loadEnvVariables)
// ✅ Predicates: is/has/can prefix (isTestMode, hasPermission)
// ✅ Variables: camelCase (userCount, apiKey)
// ✅ Constants: UPPER_SNAKE_CASE (DEFAULT_ENV_PATHS, ENABLED)
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

// ✅ Helpful error messages with context
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

// ✅ Test mode pattern
function isTestMode(): boolean {
  return process.env.GEMINI_TEST_MODE === 'true'
}
```

---

## 🔒 SECURITY RULES

```typescript
// ✅ ALWAYS use environment variables for secrets
const apiKey = await getApiKey('GEMINI_API_KEY')

// ✅ Use ${env:VAR} in opencode.jsonc
"TRELLO_API_KEY": "${env:TRELLO_API_KEY}"

// ❌ NEVER hardcode credentials
const apiKey = "sk-1234567890"  // FORBIDDEN

// ❌ NEVER log secrets
console.log(`API Key: ${apiKey}`)  // FORBIDDEN

// ✅ Validate inputs at boundaries
async function editImage(imagePath: string, prompt: string): Promise<string> {
  if (!imagePath) throw new Error("imagePath is required")
  if (!prompt) throw new Error("prompt is required")
  
  const fileExists = await Bun.file(imagePath).exists()
  if (!fileExists) throw new Error(`File not found: ${imagePath}`)
  // ...
}
```

---

## ❌ ANTI-PATTERNS TO AVOID

```typescript
// ❌ Mutation → ✅ Immutability
const addItem = (items, item) => { items.push(item); return items }  // BAD
const addItem = (items, item) => [...items, item]                    // GOOD

// ❌ Side effects → ✅ Pure functions
function calculateTotal(items) {
  console.log('Calculating...')  // Side effect!
  return items.reduce((sum, i) => sum + i.price, 0)
}

// ❌ Deep nesting → ✅ Early returns
if (user) {
  if (user.isActive) {
    if (user.hasPermission) { /* ... */ }
  }
}
// Better:
if (!user) return null
if (!user.isActive) return null
if (!user.hasPermission) return null

// ❌ Large functions → ✅ Small, focused functions (< 50 lines)
```

---

## ⚡ QUICK REFERENCE

### Golden Rules
1. **Testability first** - If you can't easily test it, refactor it
2. **Pure functions** > side effects
3. **Explicit dependencies** > hidden imports
4. **Small functions** (< 50 lines) > large functions
5. **Environment variables** > hardcoded secrets

### Pre-Commit Checklist
- [ ] No hardcoded credentials
- [ ] Functions < 50 lines
- [ ] Explicit error handling
- [ ] TypeScript types defined
- [ ] YAML frontmatter (for agents)
- [ ] No console.log of secrets

### Context Files (Load Before Coding)
- **Code tasks** → `.opencode/context/core/standards/code.md`
- **Docs tasks** → `.opencode/context/core/standards/docs.md`
- **Tests tasks** → `.opencode/context/core/standards/tests.md`

### Bun-Specific Tips
- Use `Bun.file()` for file operations (faster than fs)
- Use `Bun.write()` for writing files
- No build step needed - TypeScript runs directly
- Test mode via environment variables (e.g., `GEMINI_TEST_MODE=true`)
