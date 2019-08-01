<p align="center"><img alt="urql devtools" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" /></p>
<h2 align="center"><code>@urql/devtools</code></h2>
<p align="center">
<strong>A Chrome devtools extension for <code>urql</code> for monitoring and debugging.</strong>
</p>
<br />

- 🏎️ See operations and responses in real time
- ❣️ Easily trigger requests via the client
- 🔍 Test your exchanges in a browser environment

## Quick Start Guide

Install [`urql`](https://github.com/FormidableLabs/urql) (>= v1.2) and the [Chrome Extension](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm).
Then install the devtools exchange package:

```sh
yarn add --dev @urql/devtools
# or
npm install --save-dev @urql/devtools
```

And add the devtools exchange to your `urql` client:

```tsx
// ...
import { createClient, defaultExchanges } from "urql";
import { devtoolsExchange } from "@urql/devtools";

const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [devtoolsExchange, ...defaultExchanges]
});
```

## Contributing

Have experience working with devtools extensions or want to get involved? Check out our [development](./docs/Development.md) docs to get started.
