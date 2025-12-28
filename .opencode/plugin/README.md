# OpenAgents Plugins

This directory contains optional plugins that extend OpenAgents functionality with external integrations.

## 📦 Available Plugins

### 📱 Telegram Notifications (plugin/telegram-notify.ts, plugin/lib/telegram-bot.ts)

Integrates OpenAgents with Telegram for session monitoring and notifications.

**Features:**
- **Idle Detection**: Notifies you when your OpenCode session goes idle
- **Last Message Capture**: Tracks the last message for easy retrieval
- **Phone Integration**: Send your last message to your phone via Telegram
- **Custom Commands**: `/send-last`, `/send-to-phone`, `/last`, `/phone`
- **Activity Reset**: Automatically resets idle timer when you send messages
- **Configurable Timeouts**: Customize idle detection and check intervals
- **Toggle Control**: Enable/disable via `ENABLED` constant

**Usage:**

When enabled, the plugin automatically:
1. Monitors session activity
2. Sends Telegram notification when session goes idle
3. Captures your last message content
4. Responds to commands like `/send-last`

**Configuration:**

Required environment variables:
```bash
# Get your bot token from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Get your chat ID by messaging your bot and checking the API
TELEGRAM_CHAT_ID=your_chat_id_here

# Optional: Your bot username (defaults to @OpenCode)
TELEGRAM_BOT_USERNAME=@YourBotUsername

# Optional: Idle timeout in milliseconds (default: 5 minutes)
TELEGRAM_IDLE_TIMEOUT=300000

# Optional: Check interval in milliseconds (default: 30 seconds)
TELEGRAM_CHECK_INTERVAL=30000

# Optional: Enable/disable plugin (true/false)
TELEGRAM_ENABLED=true
```

**Getting Started:**

1. **Create Telegram Bot:**
   - Message @BotFather on Telegram
   - Send `/newbot`
   - Follow instructions to get your bot token

2. **Get Your Chat ID:**
   - Message your new bot
   - Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   - Find your `chat_id` in the response

3. **Configure Plugin:**
   - Copy `.opencode/env.example` to `.opencode/.env`
   - Add your Telegram credentials
   - Set `ENABLED = true` in `telegram-notify.ts`

4. **Restart OpenCode:**
   - Plugin will automatically load on next session

**Implementation Details:**

- **Files**: `telegram-notify.ts`, `lib/telegram-bot.ts`
- **Language**: TypeScript
- **Framework**: OpenAgents Plugin API
- **Bot Library**: Custom SimpleTelegramBot implementation
- **Event Types**: `session.idle`, `message.updated`

---

### 🔔 Simple Notifications (plugin/notify.ts)

Lightweight notification plugin for session completion alerts.

**Features:**
- **Session Completion**: Notify when your code is done
- **Simple Interface**: Uses OpenCode's `say` command
- **Toggle Control**: Enable/disable via `ENABLED` constant
- **Minimal Configuration**: No external services required

**Usage:**

When enabled, the plugin automatically:
1. Monitors for `session.idle` events
2. Displays a notification message when session is complete
3. Uses OpenCode's built-in notification system

**Configuration:**

```typescript
// Set to true to enable the plugin
const ENABLED = false
```

**Implementation Details:**

- **File**: `notify.ts`
- **Language**: TypeScript
- **Framework**: OpenAgents Plugin API
- **Dependencies**: None (uses built-in `say` command)

---

## 🔧 Installation

Plugins are automatically available when the OpenAgents framework is installed with the appropriate profile:

```bash
# Install with Telegram plugin included
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s business

# Or full profile (includes all plugins)
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s full

# Or advanced profile (includes System Builder + all plugins)
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s advanced
```

## 📚 Plugin API

All plugins follow the OpenAgents Plugin interface:

```typescript
import type { Plugin } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async ({ $ }) => {
  return {
    async event(input) {
      // Handle events: session.idle, message.updated, etc.
      if (input.event.type === "session.idle") {
        // Your plugin logic here
      }
    },
  }
}
```

### Available Events

- **session.idle**: Triggered when OpenCode session becomes inactive
- **message.updated**: Triggered when user sends a message
- **message.completed**: Triggered when a message processing completes

## 🛠️ Development

### Adding a New Plugin

1. Create a new TypeScript file in `plugin/`
2. Import the `Plugin` type from `@opencode-ai/plugin`
3. Export a function that implements the `Plugin` interface
4. Add configuration options as needed
5. Document your plugin following existing patterns

### Plugin Structure

```typescript
import type { Plugin } from "@opencode-ai/plugin"

// Configuration constants
const ENABLED = false
const TIMEOUT = 300000

export const MyPlugin: Plugin = async ({ $ }) => {
  // Plugin disabled check
  if (!ENABLED) return {}

  // Initialize plugin state
  let state = {}

  return {
    async event(input) {
      // Handle events
      switch (input.event.type) {
        case "session.idle":
          // Handle idle event
          break
        case "message.updated":
          // Handle message update
          break
      }
    },
  }
}
```

## 🔒 Security

- **No Hardcoded Credentials**: All plugins use environment variables
- **Toggle Control**: All plugins disabled by default (`ENABLED = false`)
- **Error Handling**: Graceful error handling with user-friendly messages
- **Input Validation**: Validate all external inputs (API responses, user commands)
- **Bot Security**: Telegram bot tokens and chat IDs stored in environment variables only

## 🧪 Testing

Plugins support test modes for development:

```bash
# Test Telegram plugin without sending real notifications
export TELEGRAM_TEST_MODE=true
opencode --agent openagent

# Test notification plugin
export NOTIFY_TEST_MODE=true
opencode --agent openagent
```

## 📄 License

MIT License - See repository root for details.

## 🔗 Related Resources

- [OpenAgents Framework](https://github.com/darrenhinde/OpenAgents)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [OpenCode CLI Documentation](https://opencode.ai/docs)
