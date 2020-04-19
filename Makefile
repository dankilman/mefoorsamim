build:
	npx next build

update:
	git pull

prepare: update build

start:
	npm run start

dev:
	npm run dev
