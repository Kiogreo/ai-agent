---
description: Display and manage agent rules configuration
arguments:
  - name: scope
    type: string
    description: Filter by scope (global, agent-specific, or agent name)
    required: false
    default: all
  - name: export
    type: boolean
    description: Export rules to markdown file for external LLMs
    required: false
    default: false
  - name: format
    type: string
    description: Output format (table, detailed, json)
    required: false
    default: table
---

# Rules Command

Display current agent rules configuration in tabular or detailed format. Export rules for external LLM agents.

## Usage

```bash
# Show all rules (table format)
/rules

# Show only global rules
/rules global

# Show rules for specific agent
/rules opencoder

# Show detailed format
/rules --format=detailed

# Export to markdown for external LLMs
/rules --export

# Export specific scope
/rules global --export
```

## Process

### 1. Parse Arguments

Determine what to display:
- No args → Show all rules (table format)
- `global` → Show only global rules
- `agent-specific` → Show only agent-specific rules
- `<agent-name>` → Show rules for that agent
- `--export` → Generate markdown export
- `--format=<type>` → Change output format

### 2. Load Rules

Read rules from: `.opencode/context/core/system/agent-rules.md`

Parse into structured data:
```typescript
interface Rule {
  id: string
  name: string
  scope: 'global' | 'agent-specific'
  agent?: string
  trigger: string
  action: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  workflow?: string[]
  exceptions?: string[]
}
```

### 3. Filter Rules

Apply scope filter:
- `all` → Return all rules
- `global` → Filter scope === 'global'
- `agent-specific` → Filter scope === 'agent-specific'
- `<agent-name>` → Filter agent === agent-name

### 4. Format Output

#### Table Format (Default)

```
=== Agent Rules Configuration ===

Global Rules (4):
┌────┬─────────────────────────────────┬──────────┬────────────────────────────────┐
│ ID │ Rule Name                       │ Priority │ Trigger                        │
├────┼─────────────────────────────────┼──────────┼────────────────────────────────┤
│ G1 │ Context7 for API/Library Learn  │ High     │ Learn/understand API/library   │
│ G2 │ Code Standards Enforcement      │ High     │ Writing/modifying code         │
│ G3 │ Approval-First Workflow         │ Critical │ Any write/edit/bash operation  │
│ G4 │ Incremental Execution           │ High     │ Multi-step implementation      │
└────┴─────────────────────────────────┴──────────┴────────────────────────────────┘

Agent-Specific Rules (5):
┌────┬───────────┬─────────────────────────────┬──────────┬──────────────────────┐
│ ID │ Agent     │ Rule Name                   │ Priority │ Trigger              │
├────┼───────────┼─────────────────────────────┼──────────┼──────────────────────┤
│ A1 │ opencoder │ Load Context Before Coding  │ High     │ Code implementation  │
│ A2 │ opencoder │ Delegate to Subagents       │ High     │ Specialized tasks    │
│ A3 │ opencoder │ Use TDD When Available      │ Medium   │ tests/ dir exists    │
│ A4 │ openagent │ Analyze Request Type        │ High     │ User request         │
│ A5 │ openagent │ Delegate Complex Coding     │ High     │ Complex coding task  │
└────┴───────────┴─────────────────────────────┴──────────┴──────────────────────┘

Total Rules: 9 (4 global, 5 agent-specific)
Last Updated: 2026-01-03
Version: 1.0
```

#### Detailed Format

```
=== Agent Rules Configuration (Detailed) ===

[G1] Context7 for API/Library Learning
  Scope: Global (All Agents)
  Priority: High
  Trigger: User asks to learn, understand, or get documentation for any API, library, or framework
  Action: ALWAYS use Context7 MCP server first before providing answers
  
  Workflow:
    1. Detect learning/documentation request
    2. Query Context7 MCP for official documentation
    3. Use Context7 results as primary source
    4. Supplement with general knowledge only if Context7 lacks info
    5. Always cite Context7 as source when used
  
  Exceptions:
    - Internal project code (use codebase instead)
    - Custom/proprietary libraries (use project docs)
    - Context7 API unavailable (fallback to general knowledge with warning)

[G2] Code Standards Enforcement
  Scope: Global (opencoder, coder-agent, reviewer)
  Priority: High
  Trigger: Writing or modifying code
  Action: Load and follow .opencode/context/core/standards/code.md
  
  Workflow:
    1. Read code standards before implementation
    2. Apply patterns from standards
    3. Validate against anti-patterns
    4. Use reviewer agent for verification

...
```

#### JSON Format

```json
{
  "version": "1.0",
  "lastUpdated": "2026-01-03",
  "totalRules": 9,
  "globalRules": 4,
  "agentSpecificRules": 5,
  "rules": [
    {
      "id": "G1",
      "name": "Context7 for API/Library Learning",
      "scope": "global",
      "priority": "high",
      "trigger": "User asks to learn, understand, or get documentation",
      "action": "ALWAYS use Context7 MCP server first",
      "workflow": [...],
      "exceptions": [...]
    }
  ]
}
```

### 5. Export to Markdown (if --export)

Generate markdown file at: `.output/agent-rules-export-{timestamp}.md`

Format for external LLMs:
```markdown
# Agent Rules for AI Assistants

**Generated:** {timestamp}  
**Version:** 1.0  
**Source:** OpenCode AI Agent Framework

## How to Use These Rules

This document contains rules that AI agents should follow when working in this codebase. Read and apply these rules to your responses.

## Critical Rules (Must Follow)

### Rule: Approval-First Workflow
**When:** Any write/edit/bash operation  
**What to do:** Request user approval before execution

**Example:**
```
User: "Create a new component"
AI: "I'll create a new component. Here's my plan:
1. Create component file
2. Add TypeScript types
3. Write tests

Approve to proceed?"
```

## High Priority Rules (Should Follow)

### Rule: Context7 for API/Library Learning
**When:** User asks to learn, understand, or get docs for any API/library  
**What to do:** Use Context7 MCP server first before answering

**Example:**
```
User: "How do I use React hooks?"
AI: *Queries Context7 for React hooks documentation*
AI: "Based on the official React documentation from Context7..."
```

...

## Agent-Specific Rules

### For Code Implementation (opencoder, coder-agent)
- Load `.opencode/context/core/standards/code.md` before coding
- Follow TypeScript patterns from `.opencode/context/core/standards/typescript-patterns.md`
- Use TDD when tests/ directory exists

...

## Quick Reference Table

| Rule | Trigger | Action | Priority |
|------|---------|--------|----------|
| Context7 Usage | Learn/understand API | Query Context7 first | High |
| Approval-First | Write/edit/bash | Request approval | Critical |
| Incremental | Multi-step task | One step at a time | High |

---

**Note:** These rules are automatically generated from the OpenCode agent framework. For the most up-to-date rules, run `/rules --export` in the OpenCode CLI.
```

### 6. Output Results

Display formatted output to user.

If `--export`:
- Write markdown file to `.output/`
- Display success message with file path
- Show preview of first few rules

## Output Format

### Table Format
```
=== Agent Rules Configuration ===

Global Rules (4):
[Table with ID, Name, Priority, Trigger]

Agent-Specific Rules (5):
[Table with ID, Agent, Name, Priority, Trigger]

Total: 9 rules
```

### Detailed Format
```
[Full details for each rule including workflow and exceptions]
```

### Export Success
```
✅ Rules exported successfully!

File: .output/agent-rules-export-20260103-081500.md
Size: 12.5 KB
Rules: 9 (4 global, 5 agent-specific)

Preview:
# Agent Rules for AI Assistants
Generated: 2026-01-03 08:15:00
...

Use this file with external LLM agents (Claude, ChatGPT, etc.)
```

## Examples

### Example 1: View All Rules
```bash
/rules
```
Shows table of all rules (global + agent-specific)

### Example 2: View Global Rules Only
```bash
/rules global
```
Shows only global rules that apply to all agents

### Example 3: View Rules for Specific Agent
```bash
/rules opencoder
```
Shows global rules + opencoder-specific rules

### Example 4: Export for External LLM
```bash
/rules --export
```
Generates markdown file in `.output/` for use with Claude, ChatGPT, etc.

### Example 5: Detailed View
```bash
/rules --format=detailed
```
Shows full details including workflows and exceptions

## Notes

- Rules are stored in `.opencode/context/core/system/agent-rules.md`
- Export files are timestamped to prevent overwrites
- JSON format useful for programmatic access
- External LLM exports are optimized for readability
- Rules are version-controlled for tracking changes
