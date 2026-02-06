ENV_FILE = .env

SSH_SERVER := $(shell grep '^SSH_SERVER=' $(ENV_FILE) | cut -d '=' -f2 | tr -d '"')

REMOTE_DIR = trading-bot-ai

PM2_NAME = trading-bot

LOAD_NVM = export NVM_DIR="$$HOME/.nvm" && [ -s "$$NVM_DIR/nvm.sh" ] && \. "$$NVM_DIR/nvm.sh" && nvm install

PM2_CMD = ./node_modules/.bin/pm2

SSH_CMD = ssh -q -t $(SSH_SERVER)

REMOTE_EXEC = $(SSH_CMD) 'cd $(REMOTE_DIR) && $(LOAD_NVM) &&

.PHONY: help check update ssh deploy status logs restart stop _server_update _pm2_restart

help:
	@echo "🤖 BOT MANAGER - Available commands:"
	@echo "  make check    -> Checks the code."
	@echo "  make update   -> Updates local libraries (npm-check-updates)."

update:
	@echo "⬆️  [Local] Checking for updates..."
	npx npm-check-updates -u
	npm install
	@echo "✅ [Local] Packages updated. Run 'make check' to validate."

check:
	@echo "🔍 [Local] Auditing code..."
	npm run check
	npm run build
	npm run format:check
	npm run lint
	@echo "✅ [Local] Code is healthy."
