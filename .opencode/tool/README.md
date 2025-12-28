# OpenAgents Tools

This directory contains optional tool implementations that extend OpenAgents functionality with AI capabilities.

## 📦 Available Tools

### 🖼️ Gemini AI (tool/gemini/)

AI-powered image generation, editing, and analysis using Google's Gemini API.

**Features:**
- **Image Generation**: Create images from text prompts
- **Image Editing**: Modify existing images with text instructions
- **Image Analysis**: Analyze images and answer questions about them
- **Smart File Management**: Automatic naming, timestamp handling, and conflict resolution
- **Test Mode**: Mock responses for testing without API calls

**Usage:**

```bash
# Generate an image
Generate an image: A futuristic cityscape at sunset, cyberpunk style

# Edit an existing image
Edit this image: ./assets/original.png
Add a neon sign saying "OpenAgents" in the window

# Analyze an image
Analyze this image: ./assets/photo.png
Question: What colors are predominant in this image?
```

**Configuration:**

Required environment variable:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

**Output Structure:**

Generated and edited images are automatically organized:
```
generated-images/
└── 2025-12-28/
    ├── generations/
    │   ├── generated.png
    │   └── generated_2025-12-28T14-30-45-123Z.png
    └── edits/
        ├── original_edit_001.png
        └── original_edit_002.png
```

**Implementation Details:**

- **File**: `gemini/index.ts`
- **Model**: Gemini 2.5 Flash Image Preview (image generation)
- **Model**: Gemini 1.5 Flash (image analysis)
- **Framework**: TypeScript with Bun runtime
- **Dependencies**: `@opencode-ai/plugin/tool`

---

### 🔐 Environment Variables (tool/env/)

Utility tool for loading and managing environment variables across the OpenAgents framework.

**Features:**
- **Multi-path Search**: Automatically searches common locations for `.env` files
- **Automatic Loading**: Loads variables on-demand when needed
- **Verbose Mode**: Optional logging for debugging
- **Override Control**: Configure whether to override existing environment variables
- **Type-Safe**: Full TypeScript support with interfaces
- **Error Messages**: Helpful error messages with setup instructions

**Usage:**

```typescript
import { getEnvVariable, getRequiredEnvVariable, getApiKey } from './env'

// Get optional environment variable
const value = await getEnvVariable('OPTIONAL_VAR')

// Get required environment variable (throws if missing)
const apiKey = await getRequiredEnvVariable('API_KEY')

// Get API key with automatic .env loading
const geminiKey = await getApiKey('GEMINI_API_KEY')
```

**Search Paths:**

Default locations searched (in order):
```typescript
[
  './.env',           // Current directory
  '../.env',         // Parent directory
  '../../.env',       // Two levels up
  '../plugin/.env',    // Plugin directory
  '../../../.env'     // Repository root
]
```

**Configuration Options:**

```typescript
interface EnvLoaderConfig {
  searchPaths?: string[]      // Custom paths to search
  verbose?: boolean          // Enable logging
  override?: boolean         // Override existing variables
}
```

**Implementation Details:**

- **File**: `env/index.ts`
- **Language**: TypeScript
- **Runtime**: Node.js compatible
- **Format Support**: `.env` files with `#` comments and `KEY=value` format
- **Quote Handling**: Automatically removes surrounding quotes from values

---

## 🔧 Installation

Tools are automatically available when the OpenAgents framework is installed with the appropriate profile:

```bash
# Install with tools included
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s full

# Or advanced profile (includes System Builder + tools)
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s advanced
```

## 📚 Documentation

Each tool is fully documented with:
- JSDoc comments for TypeScript types
- Usage examples in code
- Error handling and edge cases
- Configuration options

## 🛠️ Development

### Adding a New Tool

1. Create a new directory in `tool/`
2. Create an `index.ts` file with your implementation
3. Export tools using the `tool()` function from `@opencode-ai/plugin/tool`
4. Follow existing patterns (see `gemini/` for example)

### Tool Structure

```typescript
import { tool } from "@opencode-ai/plugin/tool"

export const myTool = tool({
  description: "Description of what this tool does",
  args: {
    param1: tool.schema.string().describe("Parameter description"),
    param2: tool.schema.number().optional().describe("Optional parameter"),
  },
  async execute(args, context) {
    // Your tool logic here
    return "Result"
  },
})
```

## 🔒 Security

- **No Hardcoded Credentials**: All tools must use environment variables
- **Input Validation**: Tools validate all inputs before processing
- **Error Messages**: Generic error messages (no sensitive data leaked)
- **Test Mode**: Tools support test mode to avoid API calls during development

## 📄 License

MIT License - See repository root for details.
