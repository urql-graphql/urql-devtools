# Contributing to `urql-devtools`

Thanks for contributing! We want to ensure that `urql-devtools` evolves by seeing continuous improvements and enhancements, no matter how small or big they might be.

## How to contribute?

If you want to contribute, find an issue you think you can help with and get involved!

We use issues to track changes to the project over time so make an issue if you want to contribute to something that hasn't yet been proposed/reported!

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
choose _Load unpacked_ and select the _dist/extension_ folder in the root of the repo.

### Start an urql example repo

Devtools will only be accessible if a development instance of `urql` is running.

Clone the [Urql repo](https://github.com/FormidableLabs/urql).

Change the client configuration in the example to look like this:

```tsx
// ...
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange
} from "urql";
import { devtoolsExchange } from "<path-to-devtools-dist>/exchange";

// ...
const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [dedupExchange, devtoolsExchange, cacheExchange, fetchExchange]
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

### 1. Update the version

Set the version attribute in the _package.json_

### 2. Build the new changelog

> Note: This step requires docker

```
yarn changelog --future-release [release version] --token [your github oauth token]
```

### 3. Push/merge new version to master

```
git add package.json CHANGELOG.md
git commit -m "Version v0.0.0"
git push origin master
```

### 4. Publish new release

**Warning:** This will publish a new release to the chrome app store.

_(replace v0.0.0 with your new version)_

```
git fetch origin master
git tag v0.0.0 origin/master
git push origin v0.0.0
```

### 5. Create a new release on Github

Finally, navigate to [releases](https://github.com/FormidableLabs/urql-devtools/releases) and choose _draft a new release_.

> Note: You can copy and paste release info from the changelog you just generated
