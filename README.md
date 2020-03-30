<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/FormidableLabs/urql-devtools/master/src/assets/icon.svg?sanitize=true" />
  <h1>urql devtools</h1>
  <em>A devtools extension for urql</em>
  <br />
  <br />
  <a href="https://spectrum.chat/urql">
    <img alt="Spectrum badge" src="https://withspectrum.github.io/badge/badge.svg" />
  </a>
  <a href="https://app.netlify.com/sites/urql-devtools/deploys">
    <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/f4ef8f19-899e-48eb-945c-7c7d351884e8/deploy-status" />
  </a>
</div>

### Features:

- Inspect responses and cache outcomes
- See operations and responses in real time
- Easily trigger requests via the client
- Test your exchanges in a browser environment

<br/>

  <center>
    <img width="840" alt="Screenshot 2019-09-27 at 13 55 35" src="https://user-images.githubusercontent.com/17658189/65774151-62058500-e146-11e9-8cda-c59bbd8c52ae.png">
    <img width="840" alt="Screenshot 2019-09-27 at 16 44 29" src="https://user-images.githubusercontent.com/17658189/65774077-3a162180-e146-11e9-939d-c04546612067.png">
    <img width="840" alt="Screenshot 2019-09-27 at 16 45 09" src="https://user-images.githubusercontent.com/17658189/65774083-3bdfe500-e146-11e9-9c09-265b2db6cfda.png">
  </center>

### Requirements

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
