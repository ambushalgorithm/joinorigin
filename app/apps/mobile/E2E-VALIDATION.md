# E2E Validation Report — React Native Android (Welcome to JoinOrigin)

> Validation artifact for TASK-206 (`e2e-mobile-android`).
> Role boundary: verification only — no implementation code was modified.

## Acceptance Criteria (from `agent-core/handoffs/joinorigin-dev/tasks.md` TASK-206)

| Criterion | Status | Evidence |
|---|---|---|
| Android project verified building | ✅ PASS | `./gradlew assembleDebug` → BUILD SUCCESSFUL (30s), `./gradlew assembleRelease` → BUILD SUCCESSFUL (40s) |
| Entry renders Welcome to JoinOrigin | ✅ PASS | Hermes bundle contains string; 5/5 Jest render tests pass via shared components |
| Results in test-report.md | ✅ PASS | `agent-core/handoffs/joinorigin-dev/test-report.md` updated |
| Limitations flagged | ✅ PASS | See Host Limitations below |

## Project Exists — `apps/mobile/android`

Native Android project present (29 tracked files): Gradle 8.6 wrapper,
`settings.gradle` (root `JoinOrigin`), root `build.gradle` (buildTools 34,
minSdk 23, compile/target SDK 34, NDK 26.1.10909125, Kotlin 1.9.22),
`app/build.gradle` (namespace/applicationId `com.joinorigin`, Hermes on,
New Arch off, debug+release signing), Kotlin `MainActivity.kt` /
`MainApplication.kt` under `com/joinorigin`, launcher mipmaps,
`values/strings.xml` (app_name=JoinOrigin), `values/styles.xml`,
`drawable/rn_edit_text_material.xml`, `.gitignore` (ignores
build/.gradle/local.properties, keeps debug.keystore).

## Exact Build Commands (run from this host)

```sh
# Environment used for this verification
export JAVA_HOME=/opt/java/current          # Temurin JDK 17 (17.0.20)
export PATH="$JAVA_HOME/bin:$PATH"
export ANDROID_HOME=/opt/android-sdk
export ANDROID_SDK_ROOT=/opt/android-sdk
# android/local.properties (git-ignored) contains: sdk.dir=/opt/android-sdk

cd apps/mobile/android

# 1) Debug build
./gradlew assembleDebug --console=plain
# → BUILD SUCCESSFUL in 30s (43 actionable tasks: 39 executed, 4 up-to-date)
# → app/build/outputs/apk/debug/app-debug.apk (130,011,290 bytes)

# 2) Release JS bundle (verifies Metro + shared @joinorigin packages resolve)
./gradlew :app:createBundleReleaseJsAndAssets --console=plain
# → BUILD SUCCESSFUL in 20s
# → app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle

# 3) Release build
./gradlew assembleRelease --console=plain
# → BUILD SUCCESSFUL in 40s (55 actionable tasks: 51 executed, 4 up-to-date)
# → app/build/outputs/apk/release/app-release.apk (53,297,580 bytes)
```

APK identity (via `aapt dump badging`):

```
package: name='com.joinorigin' versionCode='1' versionName='0.1.0'
sdkVersion:'23'  targetSdkVersion:'34'
application-label:'JoinOrigin'
```

## Render Verification — Welcome to JoinOrigin

Render chain (verified): `MainActivity.getMainComponentName()` returns
`JoinOriginMobile` (matches `apps/mobile/app.json` name) → `index.js`
registers `JoinOriginMobile` → `App.tsx` wraps `HomeScreen` in
`ThemeProvider` (`@joinorigin/design` theme) → `HomeScreen.tsx` renders
**Welcome to JoinOrigin** via shared `@joinorigin/ui` components
(`Screen`/`Card`/`Badge`/`Text`).

1. **Bundled-JS content check** — the Hermes-compiled release bundle
   (`index.android.bundle`) contains both `Welcome to JoinOrigin` and
   `Your workspace is ready.` (verified via `strings` on the bundle).
2. **Unit render tests** — `pnpm --filter @joinorigin/mobile test`:
   2 suites / 5 tests pass, including `App.test.tsx` → "renders Welcome to
   JoinOrigin via shared components" and `HomeScreen.test.tsx` → "renders
   the Welcome to JoinOrigin heading".
3. **Static checks** — `pnpm --filter @joinorigin/mobile typecheck` (tsc
   --noEmit) PASS; `pnpm --filter @joinorigin/mobile lint` (eslint) PASS.

## Host Limitations (flagged)

- **No emulator / no on-device rendering:** This Linux host has no
  Android emulator package, no `system-images`, no `/dev/kvm`, and no
  `adb`. The `emulator`-based run path (`react-native run-android` /
  `pnpm --filter @joinorigin/mobile run android`) cannot be executed here.
  On-device rendering is therefore verified via (a) the Hermes bundle
  content check and (b) Jest render tests of the shared-component tree,
  not a live screenshot.
- **Host-installed toolchain (not in repo):** JDK 17 Temurin at
  `/opt/java/current` and Android SDK at `/opt/android-sdk` were used;
  these are not part of the repository and must be installed per
  `apps/mobile/android/README.md` prerequisites on other hosts.
- **iOS:** Out of scope for this task (Linux host cannot verify iOS native
  build; no iOS project generated).

## Result

All TASK-206 acceptance criteria PASS. No failing criteria to flag.
No implementation files were modified by this validation role.
