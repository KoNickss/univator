all: linux windows

linux:
	node ./node_modules/electron-builder/cli.js build --linux appImage

windows:
	node ./node_modules/electron-builder/cli.js build --win portable


stylesheet:
	npx tailwindcss --input webPage/css/source.css --output webPage/css/dist.css
