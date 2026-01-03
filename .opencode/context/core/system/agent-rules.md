# Agent Rules Configuration

## Global Rules (All Agents)

### Rule 1: Context7 for API/Library Learning
**Trigger:** User asks to learn, understand, or get documentation for any API, library, or framework  
**Action:** ALWAYS use Context7 MCP server first before providing answers  
**Priority:** High  
**Scope:** All agents

**Examples of trigger phrases:**
- "How do I use [library]?"
- "Show me [API] documentation"
- "Explain [framework] concepts"
- "What's the latest [library] API?"
- "Learn about [technology]"
- "Understand [package]"

**Workflow:**
1. Detect learning/documentation request
2. Query Context7 MCP for official documentation
3. Use Context7 results as primary source
4. Supplement with general knowledge only if Context7 lacks info
5. Always cite Context7 as source when used

**Exceptions:**
- Internal project code (use codebase instead)
- Custom/proprietary libraries (use project docs)
- Context7 API unavailable (fallback to general knowledge with warning)

---

### Rule 2: Code Standards Enforcement
**Trigger:** Writing or modifying code  
**Action:** Load and follow `.opencode/context/core/standards/code.md`  
**Priority:** High  
**Scope:** opencoder, coder-agent, reviewer

**Workflow:**
1. Read code standards before implementation
2. Apply patterns from standards
3. Validate against anti-patterns
4. Use reviewer agent for verification

---

### Rule 3: Approval-First Workflow
**Trigger:** Any write/edit/bash operation  
**Action:** Request user approval before execution  
**Priority:** Critical  
**Scope:** All agents with write/bash permissions

**Workflow:**
1. Analyze request
2. Create implementation plan
3. Present plan to user
4. Wait for approval
5. Execute only after approval

**Exceptions:**
- Read-only operations (read, glob, grep)
- Explicitly approved batch operations

---

### Rule 4: Incremental Execution
**Trigger:** Multi-step implementation tasks  
**Action:** Execute one step at a time with validation  
**Priority:** High  
**Scope:** opencoder, coder-agent, task-manager

**Workflow:**
1. Break task into steps
2. Execute step 1
3. Validate (type check, lint, test)
4. Report results
5. Proceed to next step only if validation passes

---

## Agent-Specific Rules

### opencoder
- **Rule:** Load context files before coding (code.md, typescript-patterns.md)
- **Rule:** Delegate to subagents for specialized tasks (testing → tester, review → reviewer)
- **Rule:** Use TDD when tests/ directory exists

### openagent
- **Rule:** Analyze request type (question vs task) before responding
- **Rule:** Delegate complex coding to opencoder
- **Rule:** Use task-manager for 4+ file changes

### reviewer
- **Rule:** Read full file context, not just diffs
- **Rule:** Flag only actual bugs, not style preferences
- **Rule:** Verify against project conventions before flagging

### tester
- **Rule:** Follow test patterns from `.opencode/context/core/standards/tests.md`
- **Rule:** Create tests before implementation (TDD)
- **Rule:** Run tests after implementation

### documentation
- **Rule:** Follow docs standards from `.opencode/context/core/standards/docs.md`
- **Rule:** Use telegraphic style
- **Rule:** Include code examples for all patterns

---

## Rule Metadata

**Last Updated:** 2026-01-03  
**Version:** 1.0  
**Total Rules:** 8 (4 global, 4 agent-specific)  

**Rule Priority Levels:**
- **Critical:** Must never be violated (approval-first)
- **High:** Should be followed unless exceptional circumstances
- **Medium:** Best practice, can be overridden with justification
- **Low:** Suggestions, optional

---

## Adding New Rules

To add a new rule:

1. Determine scope (global or agent-specific)
2. Define clear trigger conditions
3. Specify exact action to take
4. Set priority level
5. Document workflow steps
6. List any exceptions
7. Update rule count in metadata
8. Regenerate rules export with `/rules --export`
