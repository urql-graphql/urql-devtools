<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>Urql Devtools</h1>
</div>

A chrome devtools extension for Urql.

Features:

- See operations and responses in real time
- Easily trigger requests via the client
- Test your exchanges in a browser environment

### Requirements

- [Urql](https://github.com/FormidableLabs/urql) _v1.2.0_ (or later)
- [Chrome extension](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)

### Usage

Install the devtools exchange

```sh
# Yarn
yarn add -D @urql/devtools

# Npm
npm i -D @urql/devtools
```

Add the devtools exchange to your Urql client

```tsx
// ...
import { createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

// ...
const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
});
```

### Contributing

Have experience working with devtools extensions or want to get involved? Check out our [contributing](./CONTRIBUTING.md) docs to get started.
