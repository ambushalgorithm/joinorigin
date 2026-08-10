/**
 * React Native CLI configuration.
 *
 * The mobile app lives in a pnpm monorepo, so the RN CLI must know where
 * to look for dependencies hoisted to the workspace root. This is the
 * JS-side declaration; native `ios/`/`android/` projects are intentionally
 * deferred to a later sprint.
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [],
};
