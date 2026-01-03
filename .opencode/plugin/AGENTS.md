# Plugin Development

## OVERVIEW
OpenCode plugin implementations: Telegram notifications for session events.

## STRUCTURE
```
plugin/
├── lib/
│   └── telegram-bot.ts    # Telegram bot utilities
├── notify.ts              # Generic notification plugin
├── telegram-notify.ts     # Telegram-specific implementation
├── package.json           # Dependencies
└── README.md              # Setup guide
```

## WHERE TO LOOK

| Plugin | Location | Purpose |
|--------|----------|---------|
| Generic notify | `notify.ts` | Base notification plugin |
| Telegram | `telegram-notify.ts` | Telegram bot integration |
| Bot utils | `lib/telegram-bot.ts` | Telegram API helpers |

## CONVENTIONS

**Plugin Structure:**
```typescript
// notify.ts pattern
import { plugin } from "@opencode-ai/plugin"

export default plugin({
  name: "notify",
  events: {
    "session.idle": async (event) => {
      // Handle event
    }
  }
})
```

**Event Types:**
- `session.idle` - Session inactive
- `message.updated` - Message changed
- `session.started` - New session
- `session.ended` - Session closed

**Guidelines:**
- Use @opencode-ai/plugin SDK
- TypeScript strict mode
- Environment variables for config
- Graceful error handling

## ANTI-PATTERNS

- **Hardcoded tokens** → Use environment variables
- **Blocking operations** → Async/await
- **Missing error handling** → Try/catch all API calls
- **No validation** → Check env vars on startup

## UNIQUE STYLES

**Telegram Pattern:**
```typescript
// telegram-notify.ts
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn("Telegram credentials missing, plugin disabled")
  process.exit(0)
}

// Send notification
await sendTelegramMessage(chatId, message, botToken)
```

**Error Handling:**
```typescript
try {
  await sendTelegramMessage(chatId, message, token)
} catch (error) {
  console.error("Failed to send Telegram notification:", error)
  // Don't crash - notifications are non-critical
}
```

## NOTES

**Setup:**
1. Get Telegram bot token from @BotFather
2. Get chat ID from bot
3. Add to .env file
4. Install: `cd .opencode && bun install`

**Integration:**
- Configured in opencode.jsonc
- Loaded automatically by OpenCode
- Events triggered by OpenCode runtime

**Testing:**
```bash
bun run plugin/telegram-notify.ts
```
