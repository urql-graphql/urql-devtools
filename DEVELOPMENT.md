# Development guide

There are a lot of moving parts to devtools so here's a quick run-through to make your life easier!

## ❓ What does this do?

This is a graphical interface for debugging and interacting with `urql` which consists of:

- A frontend interface for viewing and triggering `urql` actions ([see panel](https://github.com/FormidableLabs/urql-devtools/tree/master/src/panel))
- A messaging interface for communicating with the [devtools exchange](https://github.com/FormidableLabs/urql-devtools-exchange) in a browser envrioment ([see extension](https://github.com/FormidableLabs/urql-devtools/tree/master/src/extension))
- A messaging interface for communicating with the devtools exchange in a React Native environment ([see electron](https://github.com/FormidableLabs/urql-devtools/tree/master/src/electron))

## 👩‍💻 Getting started

Here are a few useful approaches to get started developing.

### Development environments

#### Fixture environment (panel)

The easiest way to get started on a change in the devtools panel is in the fixture environment.

```sh
yarn cosmos
```

With a fixture environment, you can:

- model and test panel components and their states
- quickly make visual changes to the panel (with hot reloading)
- increase test coverage

##### Updating fixture snapshots

Make sure to run the following command after making any visual changes/additions to fixtures

> Note: Check the diff output in `src/panel/__image_snapshots__/__diff_output__` before updating snapshots

```
yarn visual-regression
```

#### Shallow environment (panel/extension/electron)

When working on functional changes (such as messaging, event handling, etc), the easiest way is going to be in a shallow/test environment.

Tests environments can be spun up using the following command.

```sh
yarn test --watch
```

### Integration environments

Running an devtools in an integrated environment can be useful for working on/testing messaging features.

#### Browser environment (extension)

##### Start a build

Run the following command to start a watched build.

```sh
yarn dev:extension
```

##### Load the extension

Load the built extension in [chrome](https://developer.chrome.com/extensions/getstarted#manifest) or [firefox](https://developer.mozilla.org/en-US/docs/Tools/about:debugging#Extensions).

##### Visit a project

Visit the [live urql project](https://urql-devtools-exchange.netlify.app/) - or create an app which uses the devtools exchange and navigate to it in your browser.

#### Standalone environment (electron)

##### Start a build

Run the following command to start a watched build.

```sh
yarn dev:electron
```

##### Start devtools

Run the following command in a separate shell to start the built app.

```sh
yarn start
```

##### Start an app

If you don't already have a React Native app that uses @urql/devtools, you could use [this example app](https://github.com/kadikraman/UrqlTest)

## 🚀 Publishing releases

Anyone with write access to the repository can publish a release. The steps are as follows.

#### 1. Update the version

Set the version attribute in the _package.json_

#### 2. Build the new changelog

> Note: This step requires docker

```
yarn changelog --future-release v0.0.0[release number] --token [your github oauth token]
```

#### 3. Push/merge new version to master

```
git add package.json CHANGELOG.md
git commit -m "Version v0.0.0"
git push origin master
```

#### 4. Publish new release

_(replace v0.0.0 with your new version)_

```
git fetch origin master
git tag v0.0.0 origin/master
git push origin v0.0.0
```

> **Warning:** This will publish a new release to:
>
> - [The chrome web store](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)
> - [Mozilla addons](https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/)
> - [Npm (standalone for React Native)](https://www.npmjs.com/package/urql-devtools)

#### 5. Create a new release on Github

Finally, navigate to [releases](https://github.com/FormidableLabs/urql-devtools/releases) and choose _draft a new release_.

- You can copy and paste the release notes from the changelog you just generated
- Attatching the published assets from [the chrome store](https://stackoverflow.com/questions/7184793/how-to-download-a-crx-file-from-the-chrome-web-store-for-a-given-id), [mozilla addons](https://superuser.com/questions/440999/how-to-download-firefox-extensions-from-addons-mozilla-org-without-installing-th/441011), and npm (`wget $(npm view urql-devtools dist.tarball)`) is also a good idea
