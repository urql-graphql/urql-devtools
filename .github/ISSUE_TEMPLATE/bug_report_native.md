---
name: Bug report (standalone)
about: Create a bug report for use with the native/standalone version of devtools.
title: ""
labels: Bug
assignees: "Electron"
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

| environment | version |
| - | - |
| os | Macbuntu 20.04 |
| node | 0.0.0 |
| urql | 0.0.0 |
| urql-devtools | 0.0.0 |
| @urql/devtools | 0.0.0 |
