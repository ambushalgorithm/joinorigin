# JoinOrigin Mobile — Native Android Project

React Native 0.74 native Android project for the `@joinorigin/mobile` app
(no Expo). It boots the JS shell (`apps/mobile/index.js` → `App.tsx` →
`HomeScreen.tsx`), which renders **Welcome to JoinOrigin** using the shared
`@joinorigin/ui` components and `@joinorigin/design` tokens.

Generated from the official `react-native@0.74.7` template and adapted for
this pnpm monorepo (dependencies are hoisted to the workspace root
`node_modules/`, so all Gradle paths point 3–4 levels up from `android/`).

## Directory Map

| Path | Purpose |
|---|---|
| `app/build.gradle` | App module: applicationId `com.joinorigin`, RN Gradle plugin react paths, debug/release signing, Hermes |
| `app/src/main/AndroidManifest.xml` | Main manifest (INTERNET permission, MainActivity launcher) |
| `app/src/main/java/com/joinorigin/MainActivity.kt` | Entry activity; registers `JoinOriginMobile` (matches `app.json` name) |
| `app/src/main/java/com/joinorigin/MainApplication.kt` | Application class; autolinks packages, Hermes/New-Arch flags |
| `app/src/main/res/` | Launcher icons, `strings.xml` (app_name = JoinOrigin), theme styles |
| `settings.gradle` | Root project `JoinOrigin`; wires RN CLI native_modules + gradle plugin from hoisted node_modules |
| `build.gradle` | Root buildscript: buildTools 34, minSdk 23, compile/target SDK 34, NDK 26.1, Kotlin 1.9.22 |
| `gradle.properties` | JVM args, AndroidX, New Arch disabled, Hermes enabled |
| `gradlew` / `gradle/wrapper/` | Gradle 8.6 wrapper (no system Gradle required) |

## Prerequisites

- JDK 17+ (built/verified with OpenJDK 21)
- Android SDK with `platforms;android-34`, `build-tools;34.0.0`,
  `ndk;26.1.10909125`, `platform-tools`
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
- Gradle 8.6 is downloaded by the wrapper on first build (network required).
