.PHONY: help check update

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
	npm run build
	npm run format:check
	npm run lint
	@echo "✅ [Local] Code is healthy."
