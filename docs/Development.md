# Development

Everything you need to know to get contriubting.

## Build and install the extension

Run `npm start` to initiate the webpack and typescript build (for the extension and exchange, respectively).

Navigate to [chrome://extensions](chrome://extensions), choose _Load unpacked_ and select the _dist_ folder in the root of the repo.

## Start an urql example repo

Devtools will only be accessible if a development instance of Urql is running.

Clone the [Urql repo](https://github.com/FormidableLabs/urql).

Change the client configuration in the example to look like this:

```tsx
// ...
import { createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "<path-to-devtools-dist>/exchange";

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
