# MCP Server Setup Guide

This document provides setup instructions for the MCP servers configured in this repository.

## 🚀 Quick Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual credentials

3. **Test the configuration:**
   ```bash
   /validate-repo
   ```

## 📋 MCP Servers Overview

### 🔗 LinkedIn MCP Server
- **Repository**: [stickerdaniel/linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server)
- **Purpose**: LinkedIn profile management, job search, networking automation
- **Status**: ✅ Enabled

**Configuration:**
- Uses `uvx` for direct Python package execution
- Cookie-based authentication (no API keys required)
- Cookieless profile scraping capabilities

**Setup Steps:**
1. Log in to LinkedIn in your browser
2. Open Developer Tools (F12)
3. Go to Application > Cookies > https://www.linkedin.com
4. Find the `li_at` cookie and copy its value
5. Add to `.env`: `LINKEDIN_COOKIE=li_at=your_cookie_value`

### ⚙️ ArgoCD MCP Server
- **Repository**: [akuity/argocd-mcp](https://github.com/akuity/argocd-mcp)
- **Purpose**: GitOps application management, deployment automation
- **Status**: ✅ Enabled

**Configuration:**
- Official Akuity-maintained server
- stdio transport for secure communication
- Token-based authentication

**Setup Steps:**
1. Log in to your ArgoCD instance
2. Get API token: `argocd account get-token` or via UI
3. Get your ArgoCD server URL
4. Add to `.env`:
   ```env
   ARGOCD_BASE_URL=https://your-argocd-server.com/api/v1
   ARGOCD_API_TOKEN=your_argocd_token_here
   ```

## 🔧 Configuration Files

### opencode.jsonc
The main configuration file defines MCP servers with:
- Command execution paths
- Environment variable references
- Enable/disable flags

### .env
Contains sensitive credentials:
- Never commit to version control
- Reference in opencode.jsonc via `${env:VARIABLE_NAME}`
- Secure storage recommended

## 🛠️ Installation Requirements

### System Dependencies
- **Node.js** (for npm/npx)
- **Python** (for uvx and LinkedIn server)
- **Docker** (optional, for alternative setups)

### MCP Server Dependencies
- LinkedIn server: Auto-installed via `uvx`
- ArgoCD server: Auto-installed via `npx`

## 🧪 Testing & Validation

### Validate Configuration
```bash
/validate-repo
```

### Test Individual Servers
```bash
# Test LinkedIn MCP
uvx --from git+https://github.com/stickerdaniel/linkedin-mcp-server linkedin-mcp-server --help

# Test ArgoCD MCP
npx argocd-mcp@latest --help
```

### Check Server Status
The MCP servers will be automatically loaded when you start OpenCode agents. Check logs for:
- Successful server initialization
- Authentication success
- Available tools listing

## 🔒 Security Considerations

### LinkedIn Security
- Cookie provides full account access
- Rotate cookies periodically
- Monitor for unusual activity

### ArgoCD Security
- Use minimal required permissions
- Rotate tokens regularly
- Audit token usage

### General Security
- Never share `.env` file
- Use password managers for credential storage
- Revoke unused tokens immediately

## 📚 Usage Examples

### LinkedIn Operations
```bash
# Search for profiles
# Find job opportunities
# Get network statistics
# Send connection requests
```

### ArgoCD Operations
```bash
# List applications
# Sync deployments
# Check application status
# Manage GitOps resources
```

## 🆘 Troubleshooting

### Common Issues

**LinkedIn MCP:**
- Cookie expired: Re-obtain from browser
- Permission denied: Check cookie validity
- Server not found: Verify uvx installation

**ArgoCD MCP:**
- Token invalid: Generate new token
- Connection refused: Check ARGOCD_BASE_URL
- Permission denied: Verify token permissions

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=true
```

### Log Locations
- MCP server logs: Check agent console output
- Error details: Review agent session logs

## 📖 Additional Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [OpenCode Documentation](./AGENTS.md)
- [MCP Server Directory](https://mcpservers.org/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)

## 🔄 Updates & Maintenance

### Regular Tasks
- Rotate credentials (monthly)
- Update MCP servers (quarterly)
- Review permissions (monthly)
- Audit access logs (weekly)

### Server Updates
```bash
# Update LinkedIn MCP server
uvx --from git+https://github.com/stickerdaniel/linkedin-mcp-server linkedin-mcp-server --version

# Update ArgoCD MCP server
npx argocd-mcp@latest --version
```

---

**Note**: This setup enables powerful AI-driven automation for both professional networking (LinkedIn) and DevOps workflows (ArgoCD). Use responsibly and in accordance with platform terms of service.