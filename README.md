<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>Urql Devtools</h1>
  <p>The official browser extension for Urql</p>
  <a href="https://circleci.com/gh/FormidableLabs/workflows/urql-devtools">
    <img alt="CircleCI Build Status" src="https://badgen.net/circleci/github/FormidableLabs/urql-devtools/master?label=build" />
  </a>
  <a href="https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm">
    <img alt="Chrome Web Store" src="https://badgen.net/chrome-web-store/v/mcfphkbpmkbeofnkjehahlmidmceblmm?color=fbbc07" />
  </a>
  <a href="https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/">
    <img alt="Firefox Addon" src="https://badgen.net/amo/v/urql-devtools?color=ff7821" />
  </a>
  <a href="https://urql-devtools.netlify.com/">
    <img alt="Fixtures" src="https://badgen.net/badge/fixtures/netlify/cyan" />
  </a>
  <a href="https://spectrum.chat/urql">
    <img alt="Spectrum badge" src="https://badgen.net/badge/chat/spectrum/purple" />
  </a>
  <a href="https://github.com/FormidableLabs/urql-devtools/blob/master/LICENSE">
    <img alt="Licence MIT" src="https://badgen.net/github/license/FormidableLabs/urql-devtools" />
  </a>
</div>

<br />
<br />

<div align="center">
  <img width="500" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/ed4391cefc94bb0394e00cf4e405838ddc8e854d/assets/preview.gif" />
</div>

## Features

### 📬 Event timeline

See all debugging and network events in real time.

### 🗂 Cache explorer

Explore your cache and see when cached data is being used.

### 🚀 Request tool

Explore your backend schema and trigger queries directly via your running Urql client.

## Usage

### Add the urql exchange

Follow the instructions to [install and setup the devtools exchange](https://github.com/FormidableLabs/urql-devtools-exchange#usage)

### 🌐 Browser

Install the extension for your browser of choice

- [Chrome extension](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)
- [Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools)

Open the [devtools panel](https://developers.google.com/web/tools/chrome-devtools/open) in your browser and click on the _Urql_ tab (Make sure to restart the browser if you are unable to find _Urql_ tab)

### 📱 React Native

Start the electron app from a dedicated shell

```sh
npx urql-devtools
```

> **Note:** Android users may need to forward port 7700 from their device to their local machine:
>
> ```sh
> adb reverse tcp:7700 tcp:7700
> ```

## Integrations

Visit the [debugging docs](https://formidable.com/open-source/urql/docs/advanced/debugging/#adding-your-own-debug-events) to find out how to integrate your self-made exchanges with our devtools.

## Contributing

Have experience working with devtools extensions or want to get involved? Check out our [contributing](./CONTRIBUTING.md) docs to get started, information on setting up the project can be found [here](https://github.com/FormidableLabs/urql-devtools/blob/master/DEVELOPMENT.md).
