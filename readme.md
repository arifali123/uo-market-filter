This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Purpose

Hide urban outfitters market items so you dont buy items sold by other people and only from the retailer itself.

## Demo

Watch this [video](https://youtu.be/q-8CFg71e6k)

## Install

The extension is free to download on the [Chrome web store](https://chrome.google.com/webstore/detail/uo-mrkt/ppbnpabapoohidfalhmmailiiacaaeil)

## Contribute

### Install dependencies

```bash
pnpm install
```

### Development server

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. Likewise to change the content script, edit `content.ts` in the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit plasmo docs](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build -- --zip
# or
npm run build -- --zip
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.
