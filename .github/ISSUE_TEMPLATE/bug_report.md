---
name: Bug report
about: Create a report to help us improve
title: ""
labels: Bug
assignees: ""
---

# About

<!-- Replace  the below description with a brief summary -->

Devtools is unresponsive when using on an Android device with expo.

# Reproduction

<!-- Replace the below steps with your reproduction. -->

1.  Clone [this example](https://github.com/kadikraman/UrqlTest) react native project
2.  Plug in Android phone via USB
3.  Run `yarn install`
4.  Run `yarn start`
5.  Open devtools using npx `npx urql-devtools`

## Expected result

<!-- Tell us what you expected. -->

- App opens on Android phone
- Urql Devtools opens in standalone window
- Urql devtools detects app

## Actual result

<!-- Tell us what actually happened. -->

- App opens on Android phone
- Urql devtools opens in standalone window
- Urql devtools stays on "waiting for exchange" notice

# Additional info

<!-- For native bug reports -->

os: `Ubuntu 20.04`
urql-devtools version: `v0.0.0`
@urql/devtools version: `v0.0.0`

<!-- For browser extension bug reports -->

browser: `chrome 88 (macOS)`
extension version: `v0.0.0`
@urql/devtools version: `v0.0.0`
