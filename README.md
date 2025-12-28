# 🏠 Casa Tropicana A-7-7 Trello Automation

Automated bill card creation for Casa Tropicana unit A-7-7 using GitHub Actions and Trello API.

## 🎯 What This Does

This automation system automatically creates bill reminder cards in your Trello board:

- **Monthly Bills**: Created 7 days before the end of each month
- **Bi-Monthly Bills**: Created 7 days before the end of every 2nd month (starting January 2026)

All cards are created from templates with:
- ✅ Proper titles with month/year
- ✅ Correct start and due dates
- ✅ All checklists copied
- ✅ Labels and members assigned
- ✅ Descriptions and attachments included

## 📋 Features

- 🤖 **Fully Automated** - Runs daily via GitHub Actions
- 🆓 **100% Free** - Uses GitHub's free tier (2,000 minutes/month)
- 📅 **Smart Scheduling** - Calculates dates intelligently
- 🔄 **Template-Based** - Copies everything from your template cards
- 📊 **Detailed Logging** - See exactly what happened
- 🧪 **Dry Run Mode** - Test without creating actual cards

## 🚀 Quick Start

### 1. Get Trello API Credentials

#### Step 1: Get your API Key
1. Visit: https://trello.com/app-key
2. Copy your **API Key**

#### Step 2: Get your Token
1. On the same page, click the **Token** link (or visit the URL below, replacing `YOUR_API_KEY`)
2. URL format: `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&name=Casa%20Trello%20Automation&key=YOUR_API_KEY`
3. Click **Allow**
4. Copy your **Token**

### 2. Fork/Clone This Repository

```bash
git clone https://github.com/YOUR_USERNAME/casa-trello.git
cd casa-trello
```

### 3. Add Secrets to GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:
   - Name: `TRELLO_API_KEY`, Value: (your API key)
   - Name: `TRELLO_TOKEN`, Value: (your token)

### 4. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. Click **I understand my workflows, go ahead and enable them**

### 5. Test the Automation

#### Option A: Manual Test via GitHub Actions
1. Go to **Actions** tab
2. Click **Trello Bills Automation** workflow
3. Click **Run workflow** → **Run workflow**
4. Check the logs to see if it worked

#### Option B: Local Test
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your credentials
nano .env

# Run in dry-run mode (won't create actual cards)
npm test

# Run for real
npm start
```

## ⚙️ Configuration

Edit `config.json` to customize:

```json
{
  "scheduling": {
    "monthlyBills": {
      "enabled": true,
      "triggerDaysBeforeMonthEnd": 7,
      "cardDurationDays": 14
    },
    "biMonthlyBills": {
      "enabled": true,
      "triggerDaysBeforeMonthEnd": 7,
      "startMonth": "2026-01"
    }
  }
}
```

## 📅 Schedule

The automation runs:
- **Daily at 1:00 AM UTC** (9:00 AM Malaysia Time)
- You can also trigger it manually anytime

To change the schedule, edit `.github/workflows/trello-automation.yml`:

```yaml
on:
  schedule:
    - cron: '0 1 * * *'  # Change this cron expression
```

Cron examples:
- `0 1 * * *` - Daily at 1:00 AM UTC
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1` - Every Monday at 9:00 AM UTC

## 🧪 Testing

### Dry Run Mode

Test without creating actual cards:

```bash
npm test
```

Or set in `.env`:
```
DRY_RUN=true
```

### Manual Trigger

You can manually trigger the automation anytime:
1. Go to **Actions** tab on GitHub
2. Select **Trello Bills Automation**
3. Click **Run workflow**

## 📊 Monitoring

### View Logs

1. Go to **Actions** tab
2. Click on any workflow run
3. Click **create-bills-cards** job
4. Expand steps to see detailed logs

### Logs Include:
- ✅ Cards created
- 📅 Dates calculated
- 🔍 Template cards found
- ⚠️ Any errors or warnings

## 🔧 Troubleshooting

### "Missing Trello credentials" Error
- Make sure you added `TRELLO_API_KEY` and `TRELLO_TOKEN` as GitHub Secrets
- Check that the secret names are exactly correct (case-sensitive)

### "Template card not found" Warning
- Verify your template cards exist in the TEMPLATE list
- Check the template names in `config.json` match exactly

### Cards Not Being Created
- Check if it's the right date (7 days before month end)
- Run in dry-run mode to see what would happen
- Check the workflow logs for errors

### Workflow Not Running
- Make sure GitHub Actions is enabled in your repository
- Check the **Actions** tab for any disabled workflows
- Verify the cron schedule is correct

## 📁 Project Structure

```
casa-trello/
├── .github/
│   └── workflows/
│       └── trello-automation.yml    # GitHub Actions workflow
├── scripts/
│   └── create-bills-cards.js        # Main automation script
├── config.json                       # Configuration
├── package.json                      # Dependencies
├── .env.example                      # Example environment variables
└── README.md                         # This file
```

## 🔐 Security

- ✅ API credentials stored as GitHub Secrets (encrypted)
- ✅ Never commit `.env` file to git
- ✅ Tokens have limited scope (read, write only)
- ✅ No sensitive data in logs

## 💰 Cost

**100% FREE!**

GitHub Actions free tier includes:
- 2,000 minutes/month for private repos
- Unlimited for public repos

This automation uses ~5 minutes/month, well within the free tier.

## 🤝 Contributing

Feel free to customize this automation for your needs!

## 📝 License

MIT License - Feel free to use and modify

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the workflow logs in GitHub Actions
3. Test locally with dry-run mode
4. Check that your template cards are properly configured

---

**Made with ❤️ for Casa Tropicana A-7-7**
