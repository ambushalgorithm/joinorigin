# JoinOrigin Mobile — Native Android Project

React Native 0.87 native Android project for the `@joinorigin/mobile` app
(no Expo). It boots the JS shell (`apps/mobile/index.js` → `App.tsx` →
`HomeScreen.tsx`), which renders **Welcome to JoinOrigin** using the shared
`@joinorigin/ui` components and `@joinorigin/design` tokens.

Regenerated from the official `react-native@0.87.0` template (Gradle 9.4.1,
AGP 9.2.1 via the RN gradle plugin, Kotlin 2.2.0, compileSdk/targetSdk 36,
minSdk 24, New Architecture ON, Hermes-only) and adapted for this pnpm
monorepo (dependencies are hoisted to the workspace root `node_modules/`, so
all Gradle paths point 3–4 levels up from `android/`).

## Directory Map

| Path | Purpose |
|---|---|
| `app/build.gradle` | App module: applicationId `com.joinorigin`, RN Gradle plugin react paths, debug/release signing, Hermes-only, autolink |
| `app/src/main/AndroidManifest.xml` | Main manifest (INTERNET permission, MainActivity launcher, usesCleartextTraffic placeholder) |
| `app/src/main/java/com/joinorigin/MainActivity.kt` | Entry activity; registers `JoinOriginMobile` (matches `app.json` name) |
| `app/src/main/java/com/joinorigin/MainApplication.kt` | Application class; RN 0.87 entry point (`loadReactNative`), autolinks packages |
| `app/src/main/res/` | Launcher icons, `strings.xml` (app_name = JoinOrigin), theme styles |
| `app/debug.keystore` | Checked-in debug signing key (git-ignored pattern `*.keystore` except `debug.keystore`) |
| `settings.gradle` | Root project `JoinOrigin`; RN settings plugin + autolink command + gradle plugin includeBuild from hoisted node_modules |
| `build.gradle` | Root buildscript: buildTools 37, minSdk 24, compile/target SDK 36, NDK 27.1, Kotlin 2.2.0 |
| `gradle.properties` | JVM args, AndroidX, New Architecture ON, Hermes enabled, edge-to-edge, AGP 9 opt-outs |
| `gradlew` / `gradle/wrapper/` | Gradle 9.4.1 wrapper (no system Gradle required) |

## Prerequisites

- JDK 17+ (built/verified with OpenJDK 21)
- Android SDK with `platforms;android-36`, `build-tools;37.0.0`,
  `ndk;27.1.12297006`, `platform-tools`
- Set `ANDROID_HOME` and create `android/local.properties` with
  `sdk.dir=/path/to/android-sdk` (local.properties is git-ignored)

## Build

```sh
cd apps/mobile/android
./gradlew assembleDebug            # debug APK → app/build/outputs/apk/debug/app-debug.apk
./gradlew :app:createBundleReleaseJsAndAssets   # JS bundle only (verifies Metro + shared @joinorigin packages)
./gradlew assembleRelease          # release APK (bundles JS; needs signing config)
```

Or via pnpm from the monorepo root:

```sh
pnpm --filter @joinorigin/mobile run android:build
```

## Run on device/emulator

```sh
# from apps/mobile (metro must be running)
pnpm --filter @joinorigin/mobile run android    # = react-native run-android
pnpm --filter @joinorigin/mobile run start      # = react-native start (Metro)
```

The app expects Metro on the dev host (adb reverse is set up by
`react-native run-android`); the JS bundle in debug builds is served from
Metro, so the shared `@joinorigin/ui` components are resolved through the
monorepo `metro.config.js` watchFolders.

## Verification

- `./gradlew assembleDebug` — BUILD SUCCESSFUL (verified on this host)
- `./gradlew assembleRelease` — BUILD SUCCESSFUL (verified on this host)
- `:app:createBundleReleaseJsAndAssets` — bundle contains `Welcome to
  JoinOrigin` and the `Screen`/`Card`/`Badge` components from `@joinorigin/ui`
- `pnpm --filter @joinorigin/mobile test` — 5/5 unit tests pass (render
  Welcome to JoinOrigin via shared components)

## Notes / Host Limitations

- This host (Linux, no display) can compile the APK and bundle the JS, but
  cannot launch an Android emulator, so on-device rendering is verified by
  the bundle contents + Jest render tests rather than a live screenshot.
- iOS native project is intentionally NOT generated (cannot be verified on
  Linux; see Sprint 3 plan).
- Gradle 9.4.1 is downloaded by the wrapper on first build (network required).
