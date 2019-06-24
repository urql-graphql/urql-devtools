<div align="center">
  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE4IiBoZWlnaHQ9IjIxOCIgdmlld0JveD0iMCAwIDIxOCAyMTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02Ny41IDEzMC4zTDc1IDEzN0M3NSAxNDAgNzYuNCAxNDIuOSA3OC44IDE0NS4xTDkxLjcgMTU2LjVMMTAwIDE2My44TDk5LjkgMTcwLjZMMTA3LjcgMTY0LjZWMTcyLjRMMTE2LjYgMTY0LjlMOTEuNyAxNDIuOUw5Mi45IDE0MS43TDExOS4zIDE2NS4xVjE3M0wxMjguNiAxNjVMMTA4IDE0Ni44VjEzN0MxMDMuMiAxMzIuOCA5Ni43IDEzMC40IDg5LjkgMTMwLjRINjcuNVYxMzAuM1oiIGZpbGw9IiMyNjJENTEiLz4KPHBhdGggZD0iTTk1LjIgMTM5LjVMMTIyIDE2NC44VjE3M0wxMzEgMTY0LjdMMTExIDE0NS44VjEzNS43TDEyMC4yIDE0NC40TDE0NC41IDE0NC41TDE1OS4zIDE1OC40VjE0My42QzE1OS4zIDEzOC42IDE1Ny4yIDEzMy44IDE1My40IDEzMC4yTDExMS4yIDkwLjRMNjguOCA1MC40QzY1LjEgNDYuOSA2MC4yIDQ1IDU1LjEgNDVDNTAgNDUgNDUgNDYuOSA0MS40IDUwLjNMMTUgNzUuMkgzMC44QzM1LjEgNzEuMSA0Mi4xIDcxLjEgNDYuNCA3NS4yTDQ2LjYgNzUuNEw3OC45IDEwNS44SDYzTDQ2LjYgOTAuNFY5Ny40QzQ2LjYgMTAyLjQgNDguNyAxMDcuMiA1Mi41IDExMC44TDYzLjIgMTIwLjlMNzkgMTM1LjhDNzkgMTM4LjkgODAuMyAxNDEuOSA4Mi43IDE0NC4yTDk1LjIgMTU2TDEwMy4yIDE2My42TDEwMy4xIDE3MC42TDExMC43IDE2NC40VjE3Mi41TDExOS40IDE2NC43TDk1LjIgMTQxLjgiIGZpbGw9IiMyNjJENTEiLz4KPHBhdGggZD0iTTExMS4yIDkwLjNMMTUxLjcgNTAuM0MxNTUuMiA0Ni45IDE1OS45IDQ1IDE2NC44IDQ1QzE2OS43IDQ1IDE3NC40IDQ2LjkgMTc3LjkgNTAuM0wyMDMgNzUuMkgxODcuOUMxODMuOCA3MS4yIDE3Ny4yIDcxLjIgMTczLjEgNzUuMkwxNzIuOSA3NS40TDEzNC41IDExMy4zIiBmaWxsPSIjMjYyRDUxIi8+Cjwvc3ZnPgo=" />
  <h1>Urql Devtools</h1>
</div>

A chrome devtools extension for Urql.

Features:

- See operations and responses in real time
- Easily trigger requests via the client
- Test your exchanges in a browser environment

## Development

### Build and install the extension

Run `npm start` to initiate the webpack and typescript build (for the extension and exchange respectively).

Navigate to [chrome://extensions](chrome://extensions), choose _Load unpacked_ and select the _dist_ folder in the root of the repo.

### Start an urql example repo

Devtools will only be accessible if a development instance of Urql is running.

Clone the [Urql repo](https://github.com/FormidableLabs/urql).

Change the client configuration in the example to look like this:

```tsx
// ...
import { createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "<path-to-your-dist>/exchange";

// ...
const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
});
```

Start the example repo with `yarn start`.

### Extension tips and tricks

Some basic suggestions if you're new to building a chrome extension.

- Reloading the extension is required when changing the _content_ or _background_ scripts.
- [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=en) is a quick way to reload the extension.
- When reloading an extension, any tabs using that extension will need to be closed and reopened to be updated.
- Right click the devtools panel and hit _Reload Frame_ in order to update the _panel_ (no need to reload the extension).

## Deployment

Build the production assets with `npm run build`.
