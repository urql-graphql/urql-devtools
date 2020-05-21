# Changelog

## [v2.1.0](https://github.com/FormidableLabs/urql-devtools/tree/v2.1.0) (2020-05-21)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v2.0.1...v2.1.0)

**Added enhancements:**

- Add top-level error handling [\#236](https://github.com/FormidableLabs/urql-devtools/issues/236)
- Automatically visit latest event when clicking on the respective source icon [\#229](https://github.com/FormidableLabs/urql-devtools/issues/229)

**Fixed bugs:**

- Remove use of eval in webpack prod build output [\#241](https://github.com/FormidableLabs/urql-devtools/issues/241)
- Remove unused assets for npm release [\#240](https://github.com/FormidableLabs/urql-devtools/issues/240)

**Closed issues:**

- Set browser window icon [\#225](https://github.com/FormidableLabs/urql-devtools/issues/225)

**Merged pull requests:**

- Remove unused NPM assets [\#244](https://github.com/FormidableLabs/urql-devtools/pull/244) ([andyrichardson](https://github.com/andyrichardson))
- Add error handler [\#237](https://github.com/FormidableLabs/urql-devtools/pull/237) ([andyrichardson](https://github.com/andyrichardson))
- Jump to event when selecting a timeline source [\#235](https://github.com/FormidableLabs/urql-devtools/pull/235) ([andyrichardson](https://github.com/andyrichardson))

## [v2.0.1](https://github.com/FormidableLabs/urql-devtools/tree/v2.0.1) (2020-05-15)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v2.0.0...v2.0.1)

**Fixed bugs:**

- Event tooltips don't show on hover [\#231](https://github.com/FormidableLabs/urql-devtools/issues/231)
- Improve visual separation between timeline pane sections [\#223](https://github.com/FormidableLabs/urql-devtools/issues/223)

**Merged pull requests:**

- Improve code contrast with border [\#224](https://github.com/FormidableLabs/urql-devtools/pull/224) ([andyrichardson](https://github.com/andyrichardson))
- Remove unused deps [\#222](https://github.com/FormidableLabs/urql-devtools/pull/222) ([andyrichardson](https://github.com/andyrichardson))
- Update lockfile and reduce update spam [\#221](https://github.com/FormidableLabs/urql-devtools/pull/221) ([andyrichardson](https://github.com/andyrichardson))
- Parallel visual regression [\#142](https://github.com/FormidableLabs/urql-devtools/pull/142) ([andyrichardson](https://github.com/andyrichardson))

## [v2.0.0](https://github.com/FormidableLabs/urql-devtools/tree/v2.0.0) (2020-05-07)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v1.0.3...v2.0.0)

**Added enhancements:**

- Add React Native support [\#101](https://github.com/FormidableLabs/urql-devtools/issues/101)

**Fixed bugs:**

- Clear application state on exchange disconnect [\#215](https://github.com/FormidableLabs/urql-devtools/issues/215)
- Undefined Query Args Cause The Tools To Crash [\#181](https://github.com/FormidableLabs/urql-devtools/issues/181)

**Merged pull requests:**

- Fix crash on undefined argument value. [\#180](https://github.com/FormidableLabs/urql-devtools/pull/180) ([sporieg](https://github.com/sporieg))
- Add RN support [\#173](https://github.com/FormidableLabs/urql-devtools/pull/173) ([andyrichardson](https://github.com/andyrichardson))

## [v1.0.3](https://github.com/FormidableLabs/urql-devtools/tree/v1.0.3) (2020-04-30)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v1.0.2...v1.0.3)

**Fixed bugs:**

- No vertical scrolling on the timeline [\#177](https://github.com/FormidableLabs/urql-devtools/issues/177)
- Add custom scrollbar colors to Firefox [\#179](https://github.com/FormidableLabs/urql-devtools/pull/179) ([andyrichardson](https://github.com/andyrichardson))
- Remove error tooltip for populate directives [\#175](https://github.com/FormidableLabs/urql-devtools/pull/175) ([imranolas](https://github.com/imranolas))

**Merged pull requests:**

- Fix vertical overflow on timeline [\#178](https://github.com/FormidableLabs/urql-devtools/pull/178) ([andyrichardson](https://github.com/andyrichardson))

## [v1.0.2](https://github.com/FormidableLabs/urql-devtools/tree/v1.0.2) (2020-04-23)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v1.0.1...v1.0.2)

**Fixed bugs:**

- Fix permission errors on firefox [\#169](https://github.com/FormidableLabs/urql-devtools/issues/169)

**Merged pull requests:**

- Fix cross-origin issues [\#170](https://github.com/FormidableLabs/urql-devtools/pull/170) ([andyrichardson](https://github.com/andyrichardson))

## [v1.0.1](https://github.com/FormidableLabs/urql-devtools/tree/v1.0.1) (2020-04-22)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v1.0.0...v1.0.1)

**Closed issues:**

- Change permissions to activeTab [\#166](https://github.com/FormidableLabs/urql-devtools/issues/166)

**Merged pull requests:**

- Update permissions and trim runtime error [\#167](https://github.com/FormidableLabs/urql-devtools/pull/167) ([andyrichardson](https://github.com/andyrichardson))

## [v1.0.0](https://github.com/FormidableLabs/urql-devtools/tree/v1.0.0) (2020-04-22)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.9...v1.0.0)

**Fixed bugs:**

- Fix performance issues with Cache Explorer [\#84](https://github.com/FormidableLabs/urql-devtools/issues/84)
- Fix overlapping text in cache inspector [\#76](https://github.com/FormidableLabs/urql-devtools/issues/76)

**Closed issues:**

- Add version mismatch checks [\#161](https://github.com/FormidableLabs/urql-devtools/issues/161)
- Aquire schema via GraphQL query rather than HTTP/S [\#148](https://github.com/FormidableLabs/urql-devtools/issues/148)
- Add fixtures [\#102](https://github.com/FormidableLabs/urql-devtools/issues/102)
- Change source map path on published extensions [\#100](https://github.com/FormidableLabs/urql-devtools/issues/100)
- Event timeline [\#99](https://github.com/FormidableLabs/urql-devtools/issues/99)
- Update syntax theme of request panel [\#94](https://github.com/FormidableLabs/urql-devtools/issues/94)
- Improve icon visibility in dark mode [\#75](https://github.com/FormidableLabs/urql-devtools/issues/75)
- Component scoped events list [\#73](https://github.com/FormidableLabs/urql-devtools/issues/73)

**Merged pull requests:**

- Changes for V1 [\#165](https://github.com/FormidableLabs/urql-devtools/pull/165) ([andyrichardson](https://github.com/andyrichardson))
- Update @urql/core dep [\#164](https://github.com/FormidableLabs/urql-devtools/pull/164) ([andyrichardson](https://github.com/andyrichardson))
- Add version checks [\#162](https://github.com/FormidableLabs/urql-devtools/pull/162) ([andyrichardson](https://github.com/andyrichardson))
- Theme adjustments [\#159](https://github.com/FormidableLabs/urql-devtools/pull/159) ([andyrichardson](https://github.com/andyrichardson))
- Flash value on update [\#158](https://github.com/FormidableLabs/urql-devtools/pull/158) ([andyrichardson](https://github.com/andyrichardson))
- Add netlify badge to cosmos page [\#156](https://github.com/FormidableLabs/urql-devtools/pull/156) ([andyrichardson](https://github.com/andyrichardson))
- Add Code of Conduct [\#155](https://github.com/FormidableLabs/urql-devtools/pull/155) ([andyrichardson](https://github.com/andyrichardson))
- Add v1 readme updates [\#154](https://github.com/FormidableLabs/urql-devtools/pull/154) ([andyrichardson](https://github.com/andyrichardson))
- Add color "yellow" to theme [\#153](https://github.com/FormidableLabs/urql-devtools/pull/153) ([andyrichardson](https://github.com/andyrichardson))
- Add CodeHighlight perf optimizations [\#152](https://github.com/FormidableLabs/urql-devtools/pull/152) ([andyrichardson](https://github.com/andyrichardson))
- Add padding to start time [\#151](https://github.com/FormidableLabs/urql-devtools/pull/151) ([andyrichardson](https://github.com/andyrichardson))
- Standardize color scheme [\#150](https://github.com/FormidableLabs/urql-devtools/pull/150) ([andyrichardson](https://github.com/andyrichardson))
- Fetch schema information via graphql [\#149](https://github.com/FormidableLabs/urql-devtools/pull/149) ([andyrichardson](https://github.com/andyrichardson))
- Add groups for overlapping timeline events [\#146](https://github.com/FormidableLabs/urql-devtools/pull/146) ([andyrichardson](https://github.com/andyrichardson))
- Timeline perf improvements [\#145](https://github.com/FormidableLabs/urql-devtools/pull/145) ([andyrichardson](https://github.com/andyrichardson))
- Add native tooltips [\#144](https://github.com/FormidableLabs/urql-devtools/pull/144) ([andyrichardson](https://github.com/andyrichardson))
- Add timeline keyboard shortcuts [\#143](https://github.com/FormidableLabs/urql-devtools/pull/143) ([andyrichardson](https://github.com/andyrichardson))
- Close mutations on update or response \(w/ semaphore\) [\#141](https://github.com/FormidableLabs/urql-devtools/pull/141) ([andyrichardson](https://github.com/andyrichardson))
- Add graphql type filters [\#140](https://github.com/FormidableLabs/urql-devtools/pull/140) ([andyrichardson](https://github.com/andyrichardson))
- Add navigation links [\#139](https://github.com/FormidableLabs/urql-devtools/pull/139) ([andyrichardson](https://github.com/andyrichardson))
- Theme update [\#138](https://github.com/FormidableLabs/urql-devtools/pull/138) ([andyrichardson](https://github.com/andyrichardson))
- Integration tweaks [\#137](https://github.com/FormidableLabs/urql-devtools/pull/137) ([andyrichardson](https://github.com/andyrichardson))
- Replace events panel with timeline [\#136](https://github.com/FormidableLabs/urql-devtools/pull/136) ([andyrichardson](https://github.com/andyrichardson))
- Add filtering [\#135](https://github.com/FormidableLabs/urql-devtools/pull/135) ([andyrichardson](https://github.com/andyrichardson))
- Add panel in fixtures [\#134](https://github.com/FormidableLabs/urql-devtools/pull/134) ([andyrichardson](https://github.com/andyrichardson))
- Add offset to tooltips to prevent them from being rendered offscreen [\#133](https://github.com/FormidableLabs/urql-devtools/pull/133) ([wgolledge](https://github.com/wgolledge))
- Change timeline tooltip based on mouse position [\#132](https://github.com/FormidableLabs/urql-devtools/pull/132) ([wgolledge](https://github.com/wgolledge))
- Use updated generic [\#131](https://github.com/FormidableLabs/urql-devtools/pull/131) ([andyrichardson](https://github.com/andyrichardson))
- Add OperationType icons to the timeline [\#130](https://github.com/FormidableLabs/urql-devtools/pull/130) ([wgolledge](https://github.com/wgolledge))
- Add netlify badge [\#129](https://github.com/FormidableLabs/urql-devtools/pull/129) ([andyrichardson](https://github.com/andyrichardson))
- Update time ticks to match designs [\#128](https://github.com/FormidableLabs/urql-devtools/pull/128) ([andyrichardson](https://github.com/andyrichardson))
- Update color of events on hover [\#127](https://github.com/FormidableLabs/urql-devtools/pull/127) ([andyrichardson](https://github.com/andyrichardson))
- Timeline network visualization [\#126](https://github.com/FormidableLabs/urql-devtools/pull/126) ([andyrichardson](https://github.com/andyrichardson))
- Update timeline types [\#125](https://github.com/FormidableLabs/urql-devtools/pull/125) ([andyrichardson](https://github.com/andyrichardson))
- update cache Explorer to work with new devtools-exchange types [\#124](https://github.com/FormidableLabs/urql-devtools/pull/124) ([wgolledge](https://github.com/wgolledge))
- Update request types [\#123](https://github.com/FormidableLabs/urql-devtools/pull/123) ([andyrichardson](https://github.com/andyrichardson))
- WIP: update the event structure to use the new debug events [\#122](https://github.com/FormidableLabs/urql-devtools/pull/122) ([wgolledge](https://github.com/wgolledge))
- Update all deps to latest [\#121](https://github.com/FormidableLabs/urql-devtools/pull/121) ([wgolledge](https://github.com/wgolledge))
- Update events to use shapes instead of colour [\#120](https://github.com/FormidableLabs/urql-devtools/pull/120) ([wgolledge](https://github.com/wgolledge))
- Add panel animation on collapse [\#119](https://github.com/FormidableLabs/urql-devtools/pull/119) ([andyrichardson](https://github.com/andyrichardson))
- Add custom zoom based on mouse position [\#117](https://github.com/FormidableLabs/urql-devtools/pull/117) ([wgolledge](https://github.com/wgolledge))
- Update visual regression testing [\#116](https://github.com/FormidableLabs/urql-devtools/pull/116) ([andyrichardson](https://github.com/andyrichardson))
- Add drag-scroll and pinch to zoom ability to timeline [\#115](https://github.com/FormidableLabs/urql-devtools/pull/115) ([wgolledge](https://github.com/wgolledge))
- Add ticks + zoom scaling [\#114](https://github.com/FormidableLabs/urql-devtools/pull/114) ([andyrichardson](https://github.com/andyrichardson))
- Add TimelinePane to the Timeline [\#113](https://github.com/FormidableLabs/urql-devtools/pull/113) ([wgolledge](https://github.com/wgolledge))
- Use fullscreen arg for fixtures [\#112](https://github.com/FormidableLabs/urql-devtools/pull/112) ([andyrichardson](https://github.com/andyrichardson))
- Event timelines [\#111](https://github.com/FormidableLabs/urql-devtools/pull/111) ([andyrichardson](https://github.com/andyrichardson))
- Add Tooltips to the Event Timeline [\#109](https://github.com/FormidableLabs/urql-devtools/pull/109) ([wgolledge](https://github.com/wgolledge))
- Change root resource url on source maps [\#107](https://github.com/FormidableLabs/urql-devtools/pull/107) ([andyrichardson](https://github.com/andyrichardson))
- Update eslint rules for consistency [\#106](https://github.com/FormidableLabs/urql-devtools/pull/106) ([andyrichardson](https://github.com/andyrichardson))
- Increase type safety [\#105](https://github.com/FormidableLabs/urql-devtools/pull/105) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.9](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.9) (2019-12-17)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.8...v0.0.9)

**Fixed bugs:**

- Query panel in request page is broken [\#96](https://github.com/FormidableLabs/urql-devtools/issues/96)

**Closed issues:**

- Add automated release for Firefox [\#90](https://github.com/FormidableLabs/urql-devtools/issues/90)

## [v0.0.8](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.8) (2019-12-17)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.6...v0.0.8)

**Fixed bugs:**

- Fix visual issues on Firefox [\#88](https://github.com/FormidableLabs/urql-devtools/issues/88)

**Closed issues:**

- Fix issue where webpack watched rebuilds remove files [\#87](https://github.com/FormidableLabs/urql-devtools/issues/87)
- Create a bridging abstraction for wider browser support [\#2](https://github.com/FormidableLabs/urql-devtools/issues/2)

**Merged pull requests:**

- Add Firefox publishing [\#95](https://github.com/FormidableLabs/urql-devtools/pull/95) ([andyrichardson](https://github.com/andyrichardson))
- Migrate to Prism, fix firefox scrollbars and font sizes [\#93](https://github.com/FormidableLabs/urql-devtools/pull/93) ([andyrichardson](https://github.com/andyrichardson))
- Fix webpack rebuilds [\#91](https://github.com/FormidableLabs/urql-devtools/pull/91) ([andyrichardson](https://github.com/andyrichardson))
- Add script and info info for changelog generation [\#86](https://github.com/FormidableLabs/urql-devtools/pull/86) ([andyrichardson](https://github.com/andyrichardson))
- Keep pane hover state active on drag [\#85](https://github.com/FormidableLabs/urql-devtools/pull/85) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.6](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.6) (2019-12-02)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.5...v0.0.6)

**Fixed bugs:**

- Fix incorrect animations on event list [\#81](https://github.com/FormidableLabs/urql-devtools/issues/81)
- \[v0.0.4\] Installation not possible due to missing asset [\#74](https://github.com/FormidableLabs/urql-devtools/issues/74)

**Closed issues:**

- Create panel component [\#78](https://github.com/FormidableLabs/urql-devtools/issues/78)
- V0.0.5 prep [\#71](https://github.com/FormidableLabs/urql-devtools/issues/71)
- Fails to load with Next JS [\#67](https://github.com/FormidableLabs/urql-devtools/issues/67)
- Add message when client connection doesn't exist [\#52](https://github.com/FormidableLabs/urql-devtools/issues/52)

**Merged pull requests:**

- Add boundary for connection [\#83](https://github.com/FormidableLabs/urql-devtools/pull/83) ([andyrichardson](https://github.com/andyrichardson))
- Fix animation order [\#82](https://github.com/FormidableLabs/urql-devtools/pull/82) ([andyrichardson](https://github.com/andyrichardson))
- Pane component [\#79](https://github.com/FormidableLabs/urql-devtools/pull/79) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.5](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.5) (2019-10-16)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.4...v0.0.5)

**Closed issues:**

- Update Readme to reflect new repo migration [\#59](https://github.com/FormidableLabs/urql-devtools/issues/59)
- Option to force on in production [\#48](https://github.com/FormidableLabs/urql-devtools/issues/48)

**Merged pull requests:**

- Rename \_meta to cacheOutcome [\#72](https://github.com/FormidableLabs/urql-devtools/pull/72) ([sofiapoh](https://github.com/sofiapoh))
- Add bundling of package [\#70](https://github.com/FormidableLabs/urql-devtools/pull/70) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.4](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.4) (2019-09-30)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.3...v0.0.4)

**Closed issues:**

- devtools doesn't work with next.js example [\#64](https://github.com/FormidableLabs/urql-devtools/issues/64)
- Add 'no events' prompt on event list when no events are present [\#61](https://github.com/FormidableLabs/urql-devtools/issues/61)
- Add some images to the README [\#60](https://github.com/FormidableLabs/urql-devtools/issues/60)
- Throwing errors in console [\#57](https://github.com/FormidableLabs/urql-devtools/issues/57)
- Move devtools exchange to separate repo [\#51](https://github.com/FormidableLabs/urql-devtools/issues/51)
- Add animations for incoming events [\#27](https://github.com/FormidableLabs/urql-devtools/issues/27)

**Merged pull requests:**

- chore: remove sailci [\#68](https://github.com/FormidableLabs/urql-devtools/pull/68) ([sofiapoh](https://github.com/sofiapoh))
- \(Feat\) Data Explorer [\#66](https://github.com/FormidableLabs/urql-devtools/pull/66) ([sofiapoh](https://github.com/sofiapoh))
- \(feat\) - notify user of no events [\#62](https://github.com/FormidableLabs/urql-devtools/pull/62) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(fix\) - align the Time header right [\#58](https://github.com/FormidableLabs/urql-devtools/pull/58) ([JoviDeCroock](https://github.com/JoviDeCroock))
- Migration to separate devtools exchange from devtools extension [\#50](https://github.com/FormidableLabs/urql-devtools/pull/50) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.3](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.3) (2019-08-21)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.2...v0.0.3)

**Closed issues:**

- Clear event list when page is refreshed [\#53](https://github.com/FormidableLabs/urql-devtools/issues/53)
- Add minification for 'panel' [\#38](https://github.com/FormidableLabs/urql-devtools/issues/38)
- Add a page action to the icon [\#36](https://github.com/FormidableLabs/urql-devtools/issues/36)

**Merged pull requests:**

- Copy over metadata changes from urql-devtools-exchange [\#56](https://github.com/FormidableLabs/urql-devtools/pull/56) ([kitten](https://github.com/kitten))
- \(chore\) - add spectrum badge [\#54](https://github.com/FormidableLabs/urql-devtools/pull/54) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(feat\) - event card animation [\#49](https://github.com/FormidableLabs/urql-devtools/pull/49) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(fix\) - invalid utf-8 character in minified output [\#47](https://github.com/FormidableLabs/urql-devtools/pull/47) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(fix\) - enable minification [\#46](https://github.com/FormidableLabs/urql-devtools/pull/46) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(chore\) - move webpack deps to devDependencies [\#44](https://github.com/FormidableLabs/urql-devtools/pull/44) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(chore\) - correct links [\#43](https://github.com/FormidableLabs/urql-devtools/pull/43) ([JoviDeCroock](https://github.com/JoviDeCroock))
- \(feat\) - headers for devtools [\#42](https://github.com/FormidableLabs/urql-devtools/pull/42) ([JoviDeCroock](https://github.com/JoviDeCroock))
- Update and rename docs/Development.md to CONTRIBUTING.md [\#40](https://github.com/FormidableLabs/urql-devtools/pull/40) ([kitten](https://github.com/kitten))
- Add page action when content script connects [\#39](https://github.com/FormidableLabs/urql-devtools/pull/39) ([andyrichardson](https://github.com/andyrichardson))

## [v0.0.2](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.2) (2019-07-26)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/v0.0.1...v0.0.2)

**Closed issues:**

- Add latency info to requests [\#23](https://github.com/FormidableLabs/urql-devtools/issues/23)

## [v0.0.1](https://github.com/FormidableLabs/urql-devtools/tree/v0.0.1) (2019-07-22)

[Full Changelog](https://github.com/FormidableLabs/urql-devtools/compare/e8ac03102c8ecf80acf7d12a8a50d383ac11558f...v0.0.1)

**Fixed bugs:**

- Use a separate event for devtools responses [\#16](https://github.com/FormidableLabs/urql-devtools/issues/16)

**Closed issues:**

- Add .npmignore file to remove unneeded files from package [\#35](https://github.com/FormidableLabs/urql-devtools/issues/35)
- Add LICENSE file [\#34](https://github.com/FormidableLabs/urql-devtools/issues/34)
- Add 'response' information to mutation popout [\#18](https://github.com/FormidableLabs/urql-devtools/issues/18)
- Add 'response state' information to query popout [\#17](https://github.com/FormidableLabs/urql-devtools/issues/17)
- Add visual prompt for how to execute a query [\#15](https://github.com/FormidableLabs/urql-devtools/issues/15)
- Infer type of operation when making a request in devtools [\#14](https://github.com/FormidableLabs/urql-devtools/issues/14)
- Update theme/styling to better match branding [\#12](https://github.com/FormidableLabs/urql-devtools/issues/12)
- Create a panel for errors [\#11](https://github.com/FormidableLabs/urql-devtools/issues/11)
- Add graphql autocompletion when creating a request [\#7](https://github.com/FormidableLabs/urql-devtools/issues/7)
- Add filtering capabilities to event overview [\#4](https://github.com/FormidableLabs/urql-devtools/issues/4)
- Add basic CI steps [\#3](https://github.com/FormidableLabs/urql-devtools/issues/3)
- Unify build process [\#1](https://github.com/FormidableLabs/urql-devtools/issues/1)
- Add in changelog / changelog automation [\#32](https://github.com/FormidableLabs/urql-devtools/issues/32)
- Add CI for automated release [\#30](https://github.com/FormidableLabs/urql-devtools/issues/30)
- Update README for release [\#29](https://github.com/FormidableLabs/urql-devtools/issues/29)
- Fix build error [\#10](https://github.com/FormidableLabs/urql-devtools/issues/10)

**Merged pull requests:**

- Add ignores for npm publish [\#37](https://github.com/FormidableLabs/urql-devtools/pull/37) ([andyrichardson](https://github.com/andyrichardson))
- Adds auto-publishing for tags [\#33](https://github.com/FormidableLabs/urql-devtools/pull/33) ([andyrichardson](https://github.com/andyrichardson))
- update dependency and remove type overrides [\#31](https://github.com/FormidableLabs/urql-devtools/pull/31) ([andyrichardson](https://github.com/andyrichardson))
- Simplify client event model [\#26](https://github.com/FormidableLabs/urql-devtools/pull/26) ([andyrichardson](https://github.com/andyrichardson))
- Move filters to context and update styles [\#25](https://github.com/FormidableLabs/urql-devtools/pull/25) ([sofiapoh](https://github.com/sofiapoh))
- Filter event list [\#24](https://github.com/FormidableLabs/urql-devtools/pull/24) ([sofiapoh](https://github.com/sofiapoh))
- fix refetching and fix mutation detection [\#22](https://github.com/FormidableLabs/urql-devtools/pull/22) ([andyrichardson](https://github.com/andyrichardson))
- show responses for queries and mutations [\#21](https://github.com/FormidableLabs/urql-devtools/pull/21) ([andyrichardson](https://github.com/andyrichardson))
- add error panel [\#20](https://github.com/FormidableLabs/urql-devtools/pull/20) ([andyrichardson](https://github.com/andyrichardson))
- add prompt [\#19](https://github.com/FormidableLabs/urql-devtools/pull/19) ([andyrichardson](https://github.com/andyrichardson))
- Update styling [\#13](https://github.com/FormidableLabs/urql-devtools/pull/13) ([andyrichardson](https://github.com/andyrichardson))
- Add autocompletion to request [\#8](https://github.com/FormidableLabs/urql-devtools/pull/8) ([andyrichardson](https://github.com/andyrichardson))
- Unify build [\#6](https://github.com/FormidableLabs/urql-devtools/pull/6) ([andyrichardson](https://github.com/andyrichardson))
- Add CI [\#5](https://github.com/FormidableLabs/urql-devtools/pull/5) ([andyrichardson](https://github.com/andyrichardson))
