---
name: Bug report (browser extension)
about: Create a bug report for the browser extension version of devtools.
title: ""
labels: Bug
assignees:
---

# About

<!-- Replace  the below description with a brief summary -->

Devtools does not detect a running instance of urql.

# Reproduction

<!-- Replace the below steps with your reproduction. -->

1.  Clone [this example](https://github.com/FormidableLabs/urql/tree/main/packages/react-urql/examples/1-getting-started) project
2.  Run `yarn install`
3.  Run `yarn start`
4.  Open chrome and navigate to [http://localhost:8080](http://localhost:8080)
5.  Open the urql devtools panel

## Expected result

<!-- Tell us what you expected. -->

- Extension detects app

## Actual result

<!-- Tell us what actually happened. -->

- Extension shows message "Waiting for exchange"

# Additional info

| environment    | version   |
| -------------- | --------- |
| browser        | Chrome 69 |
| urql           | 0.0.0     |
| urql devtools  | 0.0.0     |
| @urql/devtools | 0.0.0     |
