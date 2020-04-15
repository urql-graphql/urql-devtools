<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>urql devtools</h1>
  <em>A devtools extension for urql</em>
  <br />
  <br />
  <a href="https://spectrum.chat/urql">
    <img alt="Spectrum badge" src="https://withspectrum.github.io/badge/badge.svg" />
  </a>
</div>

## Features

![Slideshow of features](https://github.com/FormidableLabs/urql-devtools/raw/aef5570a698023ef01f355c2c802f93d7f2bf006/assets/preview.gif)

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
