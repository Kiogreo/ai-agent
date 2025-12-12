---
description: Analyze web documentation
model: anthropic/claude-sonnet-4-5
agent: docs-processor
subtask: true
permission:
    webfetch: allow
    edit: ask
---

Go to the URL $ARGUMENTS, verify if the page is actually a technical documentation, then analyze the web documentation. After that, suggest to create a Markdown file to summarize the analysis for other ai agents.
