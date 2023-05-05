all: linux windows node_modules

node_modules:
	npm install

linux: node_modules
	npx electron-builder build --linux appImage

windows: node_modules
	npx electron-builder build --win portable


stylesheet:
	npx tailwindcss --input webPage/css/source.css --output webPage/css/dist.css
