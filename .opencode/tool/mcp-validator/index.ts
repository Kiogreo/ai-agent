#!/usr/bin/env bun

/**
 * MCP Credential Validator
 * 
 * Validates that all enabled MCP servers have required credentials configured.
 * Run this before starting OpenCode to catch configuration issues early.
 * 
 * Usage:
 *   bun run .opencode/tool/mcp-validator/index.ts
 *   bun run .opencode/tool/mcp-validator/index.ts --fix
 */

import { readFile } from "fs/promises"
import { resolve } from "path"

interface MCPServer {
  enabled: boolean
  type?: string
  command?: string[]
  environment?: Record<string, string>
}

interface MCPConfig {
  mcp: Record<string, MCPServer>
}

interface ValidationResult {
  server: string
  enabled: boolean
  valid: boolean
  missing: string[]
  warnings: string[]
}

/**
 * Load environment variables from .env file
 */
async function loadEnvVariables(): Promise<Record<string, string>> {
  const envPath = resolve(process.cwd(), ".env")
  const env: Record<string, string> = {}
  
  try {
    const content = await Bun.file(envPath).text()
    const lines = content.split("\n")
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith("#")) continue
      
      // Parse KEY=VALUE
      const match = trimmed.match(/^([^=]+)=(.*)$/)
      if (match) {
        const [, key, value] = match
        env[key.trim()] = value.trim()
      }
    }
    
    return env
  } catch (error) {
    console.warn("⚠️  .env file not found, using process.env only")
    return {}
  }
}

/**
 * Extract environment variable name from ${env:VAR_NAME} or ${input:VAR_NAME}
 */
function extractEnvVarName(value: string): string | null {
  const match = value.match(/\$\{(?:env|input):([^}]+)\}/)
  return match ? match[1] : null
}

/**
 * Check if environment variable is set and not a placeholder
 */
function isEnvVarValid(value: string | undefined): boolean {
  if (!value) return false
  
  // Check for placeholder values
  const placeholders = [
    "your_",
    "YOUR_",
    "placeholder",
    "PLACEHOLDER",
    "example",
    "EXAMPLE",
    "token_here",
    "key_here",
    "api_key_here"
  ]
  
  return !placeholders.some(placeholder => value.includes(placeholder))
}

/**
 * Validate a single MCP server configuration
 */
function validateMCPServer(
  name: string,
  config: MCPServer,
  env: Record<string, string>
): ValidationResult {
  const result: ValidationResult = {
    server: name,
    enabled: config.enabled,
    valid: true,
    missing: [],
    warnings: []
  }
  
  // Skip disabled servers
  if (!config.enabled) {
    return result
  }
  
  // Check if environment variables are defined
  if (config.environment) {
    for (const [key, value] of Object.entries(config.environment)) {
      const varName = extractEnvVarName(value)
      
      if (varName) {
        // Check in loaded .env and process.env
        const envValue = env[varName] || process.env[varName]
        
        if (!envValue) {
          result.valid = false
          result.missing.push(varName)
        } else if (!isEnvVarValid(envValue)) {
          result.valid = false
          result.warnings.push(`${varName} appears to be a placeholder value`)
        }
      }
    }
  }
  
  // Server-specific validations
  switch (name) {
    case "github":
      if (config.command?.includes("docker")) {
        // Check if Docker is available
        try {
          const proc = Bun.spawnSync(["docker", "--version"])
          if (proc.exitCode !== 0) {
            result.warnings.push("Docker not found - GitHub MCP requires Docker")
          }
        } catch {
          result.warnings.push("Docker not found - GitHub MCP requires Docker")
        }
      }
      break
      
    case "context7":
      if (config.command?.includes("npx")) {
        // Check if npx is available
        try {
          const proc = Bun.spawnSync(["npx", "--version"])
          if (proc.exitCode !== 0) {
            result.warnings.push("npx not found - Context7 MCP requires Node.js/npx")
          }
        } catch {
          result.warnings.push("npx not found - Context7 MCP requires Node.js/npx")
        }
      }
      break
  }
  
  return result
}

/**
 * Load and parse opencode.jsonc
 */
async function loadMCPConfig(): Promise<MCPConfig | null> {
  const configPath = resolve(process.cwd(), "opencode.jsonc")
  
  try {
    const content = await Bun.file(configPath).text()
    
    // Remove comments from JSONC
    const jsonContent = content
      .split("\n")
      .filter(line => !line.trim().startsWith("//"))
      .join("\n")
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove /* */ comments
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
    
    return JSON.parse(jsonContent) as MCPConfig
  } catch (error) {
    console.error("❌ Failed to load opencode.jsonc:", error)
    return null
  }
}

/**
 * Display validation results
 */
function displayResults(results: ValidationResult[]): boolean {
  console.log("\n=== MCP Credential Validation ===\n")
  
  const enabled = results.filter(r => r.enabled)
  const valid = enabled.filter(r => r.valid && r.warnings.length === 0)
  const invalid = enabled.filter(r => !r.valid)
  const warnings = enabled.filter(r => r.valid && r.warnings.length > 0)
  
  // Display valid servers
  if (valid.length > 0) {
    console.log("✅ Valid MCP Servers:")
    for (const result of valid) {
      console.log(`   ✓ ${result.server}`)
    }
    console.log()
  }
  
  // Display servers with warnings
  if (warnings.length > 0) {
    console.log("⚠️  MCP Servers with Warnings:")
    for (const result of warnings) {
      console.log(`   ⚠ ${result.server}`)
      for (const warning of result.warnings) {
        console.log(`     - ${warning}`)
      }
    }
    console.log()
  }
  
  // Display invalid servers
  if (invalid.length > 0) {
    console.log("❌ Invalid MCP Servers:")
    for (const result of invalid) {
      console.log(`   ✗ ${result.server}`)
      
      if (result.missing.length > 0) {
        console.log(`     Missing credentials:`)
        for (const missing of result.missing) {
          console.log(`     - ${missing}`)
        }
      }
      
      if (result.warnings.length > 0) {
        for (const warning of result.warnings) {
          console.log(`     - ${warning}`)
        }
      }
    }
    console.log()
  }
  
  // Summary
  console.log("Summary:")
  console.log(`  Total enabled: ${enabled.length}`)
  console.log(`  Valid: ${valid.length}`)
  console.log(`  Warnings: ${warnings.length}`)
  console.log(`  Invalid: ${invalid.length}`)
  console.log()
  
  // Instructions for fixing
  if (invalid.length > 0) {
    console.log("To fix missing credentials:")
    console.log("1. Copy .env.example to .env if you haven't already")
    console.log("2. Add the missing credentials to your .env file")
    console.log("3. Run this validator again to verify")
    console.log()
    
    // Show specific instructions
    for (const result of invalid) {
      if (result.missing.length > 0) {
        console.log(`For ${result.server}:`)
        for (const missing of result.missing) {
          console.log(`  echo "${missing}=your_value_here" >> .env`)
        }
      }
    }
    console.log()
  }
  
  return invalid.length === 0
}

/**
 * Main validation function
 */
async function main() {
  const args = process.argv.slice(2)
  const fixMode = args.includes("--fix")
  
  console.log("🔍 Validating MCP server credentials...\n")
  
  // Load configuration
  const config = await loadMCPConfig()
  if (!config || !config.mcp) {
    console.error("❌ No MCP configuration found in opencode.jsonc")
    process.exit(1)
  }
  
  // Load environment variables
  const env = await loadEnvVariables()
  
  // Validate each MCP server
  const results: ValidationResult[] = []
  for (const [name, serverConfig] of Object.entries(config.mcp)) {
    const result = validateMCPServer(name, serverConfig, env)
    results.push(result)
  }
  
  // Display results
  const allValid = displayResults(results)
  
  // Exit with appropriate code
  if (allValid) {
    console.log("✅ All enabled MCP servers have valid credentials!")
    process.exit(0)
  } else {
    console.log("❌ Some MCP servers have missing or invalid credentials")
    console.log("   Fix the issues above before starting OpenCode CLI")
    process.exit(1)
  }
}

// Run if executed directly
if (import.meta.main) {
  main().catch(error => {
    console.error("❌ Validation failed:", error)
    process.exit(1)
  })
}

export { validateMCPServer, loadMCPConfig, loadEnvVariables }
