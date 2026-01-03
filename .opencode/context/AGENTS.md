# Context Management

## OVERVIEW
Knowledge organization system: 21 context files across 5 categories for agent guidance.

## STRUCTURE
```
context/
├── core/                    # Universal patterns and standards
│   ├── standards/          # Code, docs, tests, patterns
│   ├── workflows/           # Development workflows
│   └── essential-patterns.md # Core coding patterns
├── domain/                  # Domain-specific knowledge
│   └── fitness/            # Fitness domain (3 files)
│       ├── bear-aesthetics.md
│       ├── training.md
│       └── liftosaur.md
├── processes/               # Workflow processes
│   └── fitness/            # Fitness processes (2 files)
│       ├── progress.md
│       └── form-analysis.md
├── standards/               # Domain standards
│   └── fitness/            # Fitness standards (2 files)
│       ├── privacy.md
│       └── metrics.md
├── templates/               # Output formats
│   └── fitness/            # Fitness templates (1 file)
│       └── progress-report.md
└── project/                 # Project-specific patterns
    └── project-context.md   # Your custom patterns
```

## WHERE TO LOOK

| Context Type | Location | Purpose |
|--------------|----------|---------|
| Universal patterns | `core/` | Cross-project standards |
| Domain knowledge | `domain/{domain}/` | Specific domain expertise |
| Workflows | `processes/{domain}/` | Step-by-step processes |
| Rules | `standards/{domain}/` | Domain-specific rules |
| Formats | `templates/{domain}/` | Output templates |
| Custom patterns | `project/` | Your project patterns |

## CONVENTIONS

**File Organization:**
- **core/** - Universal, loaded by all agents
- **domain/** - Specific knowledge areas (fitness, e-commerce, etc.)
- **processes/** - Workflow definitions and steps
- **standards/** - Rules and constraints
- **templates/** - Output formats and examples
- **project/** - Your custom patterns

**Content Guidelines:**
- Markdown only (no YAML frontmatter)
- 50-150 lines per file
- Telegraphic style, essential info
- Max 4 files loaded per agent (250-450 lines total)

**Loading Pattern:**
```
Agent loads → core/ + domain/ + processes/ + standards/ → 4 files max
```

## ANTI-PATTERNS

**Organization:**
- **Flat structure** → Use hierarchical categories
- **Large files (>150 lines)** → Split into focused topics
- **Duplicate content** → Don't repeat core/ in domain/
- **Mixed categories** → Keep clear boundaries

**Content:**
- **Generic advice** → Specific, actionable patterns
- **Missing examples** → Include code examples
- **No structure** → Use clear headings and sections

## UNIQUE STYLES

**Domain Pattern (Fitness example):**
```
context/
├── domain/fitness/          # What fitness is
├── processes/fitness/       # How fitness works
├── standards/fitness/       # Fitness rules
└── templates/fitness/       # Fitness outputs
```

**Reusable for any domain:** e-commerce, customer-support, data-analysis, etc.

**Core Standards:**
- `essential-patterns.md` - Universal coding patterns
- `standards/code.md` - Code quality rules
- `standards/tests.md` - Testing patterns
- `standards/docs.md` - Documentation standards

## NOTES

**Context Loading:**
- Agents automatically load relevant context files
- Priority: core/ → domain/ → processes/ → standards/
- Project-specific patterns override defaults

**Domain Expansion:**
- Add new domains: `context/domain/{new-domain}/`
- Follow the 4-category pattern (domain, processes, standards, templates)
- Create corresponding subagents and commands

**Integration:**
- Context files guide agent behavior
- Patterns are automatically applied
- Standards are enforced through agent training

**Quality:**
- All context files must be actionable
- Include examples for every pattern
- Keep content focused and essential