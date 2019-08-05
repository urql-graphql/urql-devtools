# Contributing to `urql-devtools`

Thanks for contributing! We want to ensure that `urql-devtools` evolves by seeing continuous improvements and enhancements, no matter how small or big they might be.

## How to contribute?

We follow fairly standard but lenient rules around pull requests and issues. Please pick a title that describes your change briefly, optionally in the imperative mood if possible.

If you have an idea for a feature or want to fix a bug, consider opening an issue first. We're also happy to discuss and help you open a PR and get your changes in!

## How do I set up the project?

Luckily it's not hard to get started. You can install dependencies using `yarn`. Please don't use `npm` to respect the lockfile.

```sh
yarn
```

Run `yarn start` to initiate the Webpack and TypeScript build (for the extension and exchange, respectively).

```sh
yarn start
```

Navigate to [chrome://extensions](chrome://extensions), toggle `Developer mode` on,
choose _Load unpacked_ and select the _dist_ folder in the root of the repo.

### Start an urql example repo

Devtools will only be accessible if a development instance of `urql` is running.

Clone the [Urql repo](https://github.com/FormidableLabs/urql).

Change the client configuration in the example to look like this:

```tsx
// ...
import { createClient, defaultExchanges } from "urql";
import { devtoolsExchange } from "<path-to-devtools-dist>/exchange";

// ...
const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [devtoolsExchange, ...defaultExchanges]
});
```

Start the example repo with `yarn start`.

### Extension tips and tricks

Some basic suggestions if you're new to building a chrome extension.

- Reloading the extension is required when changing the _content_ or _background_ scripts.
- [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=en) is a quick way to reload the extension.
- When reloading an extension, any tabs using that extension will need to be closed and reopened to be updated.
- Right click the devtools panel and hit _Reload Frame_ in order to update the _panel_ (no need to reload the extension).

## How do I publish a new version?

Build the production assets with `yarn build`.

```sh
yarn build
```

Check whether the build is ready to go. The CI is set up to automatically publish
a new version of the package automatically when a new tag is added on the Git repository.
The Chrome extension publishing is unfortunately not a straightforward right now however.
