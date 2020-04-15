<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>Urql Devtools</h1>
  <p>The official browser extension for Urql</p>
  <a href="https://circleci.com/gh/FormidableLabs/workflows/urql-devtools">
    <img alt="CircleCI Build Status" src="https://badgen.net/circleci/github/FormidableLabs/urql-devtools?label=build" />
  </a>
  <a href="https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm">
    <img alt="Chrome Web Store" src="https://badgen.net/chrome-web-store/v/mcfphkbpmkbeofnkjehahlmidmceblmm" />
  </a>
  <a href="https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/">
    <img alt="Firefox Addon" src="https://badgen.net/amo/v/urql-devtools" />
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
  <img width="500" src="https://github.com/FormidableLabs/urql-devtools/raw/aef5570a698023ef01f355c2c802f93d7f2bf006/assets/preview.gif" />
</div>


## Features

### 📬 Event timeline

See all debugging and network events in real time.

### 🗂 Cache explorer
Explore your cache and see when cached data is being used.

### 🚀 Request tool
Explore your backend schema and trigger queries directly via your running Urql client.

## Usage

Install the extension for your browser of choice
 - [Chrome extension](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)
 - [Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools)

Install the [devtools exchange](https://github.com/FormidableLabs/urql-devtools-exchange)

```sh
# npm
npm i -D @urql/devtools

# yarn
yarn add -D @urql/devtools
```

Add the exchange to your Urql client

```js
import { createClient, defaultExchanges } from 'urql';
import { devtoolsExchange } from "@urql/devtools";

const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [devtoolsExchange, ...defaultExchanges],
});
```

## Contributing

Have experience working with devtools extensions or want to get involved? Check out our [contributing](./CONTRIBUTING.md) docs to get started.
