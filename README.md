<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>Urql Devtools</h1>
  <p>The official browser extension for Urql</p>
  <a href="https://circleci.com/gh/FormidableLabs/workflows/urql-devtools">
    <img alt="CircleCI Build Status" src="https://badgen.net/circleci/github/FormidableLabs/urql-devtools" />
  </a>
  <a href="https://github.com/FormidableLabs/urql-devtools/blob/master/LICENSE">
    <img alt="Licence MIT" src="https://badgen.net/github/license/FormidableLabs/urql-devtools" />
  </a>
  <a href="https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm">
    <img alt="Chrome Web Store" src="https://badgen.net/chrome-web-store/v/mcfphkbpmkbeofnkjehahlmidmceblmm" />
  </a>
  <a href="https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/">
    <img alt="Firefox Addon" src="https://badgen.net/amo/v/urql-devtools" />
  </a>
  <a href="https://spectrum.chat/urql">
    <img alt="Spectrum badge" src="https://badgen.net/badge/chat/spectrum/purple" />
  </a>
  

  
  
</div>

## About

<div align="center">
  <img width="500" src="https://github.com/FormidableLabs/urql-devtools/raw/aef5570a698023ef01f355c2c802f93d7f2bf006/assets/preview.gif" />
</div>

## Requirements

Install the [`urql-devtools-exchange`](https://github.com/FormidableLabs/urql-devtools-exchange)

```sh
# yarn
yarn add -D @urql/devtools

# npm
npm i -D @urql/devtools
```

- [urql](https://github.com/FormidableLabs/urql) _v1.2.0_ (or later)
- [Chrome extension](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)
- [Firefox extension](https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/)

### Usage

Add the devtools exchange to your urql client

```tsx
// ...
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "urql";

import { devtoolsExchange } from "@urql/devtools";

// ...
const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [dedupExchange, devtoolsExchange, cacheExchange, fetchExchange],
});
```

### Contributing

Have experience working with devtools extensions or want to get involved? Check out our [contributing](./CONTRIBUTING.md) docs to get started.
