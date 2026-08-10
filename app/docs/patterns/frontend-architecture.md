# JoinOrigin Cross-Platform Frontend Architecture

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Source:** Frontend architecture reference spec (Next.js Web/PWA + React Native, no Expo, shared packages)

> **Monorepo root:** The JoinOrigin frontend monorepo lives inside `app/` per UWP
> [ARCHITECTURE.md §7.1 Root Minimalism](../ARCHITECTURE.md). The repo root
> contains only `AGENTS.md` + `.gitignore` + `app/`; all monorepo components
> (`apps/`, `packages/`, `tests/e2e/`) and configuration (`package.json`,
> `pnpm-workspace.yaml`, `turbo.json`, etc.) live under `app/`. Run all pnpm
> commands from `app/`.

## Table of Contents

1. [Overview](#overview)
2. [Overall Architecture](#overall-architecture)
3. [React Native Web](#react-native-web)
4. [Universal Components](#universal-components)
5. [styled-components](#styled-components)
6. [Design System](#design-system)
7. [Platform-Specific Implementations](#platform-specific-implementations)
8. [Platform-Specific Services](#platform-specific-services)
9. [Shared Logic + Platform View Pattern](#shared-logic--platform-view-pattern)
10. [Complex Web Experiences](#complex-web-experiences)
11. [Next.js Boundary](#next-js-boundary)
12. [Decision Process for New Components](#decision-process-for-new-components)
13. [Core Rule](#core-rule)

---

## Overview

JoinOrigin uses a shared cross-platform architecture across:

```text
Next.js
├── Web
└── PWA

React Native
├── iOS
└── Android
```

The goal is to **maximize code sharing without forcing web and native platforms to use identical implementations when their capabilities or UX genuinely differ**.

The primary principles are:

1. Share types, schemas, API clients, business logic, state, hooks, and utilities aggressively.
2. Use **React Native Web** to create universal UI components where practical.
3. Use **styled-components** as the primary styling system.
4. Use `styled-components/native` for universal and native components.
5. Use platform-specific `.web.tsx` / `.native.tsx` implementations when web and native genuinely need different behavior.
6. Keep the public interface consistent across platform implementations.
7. Keep Next.js-specific/server functionality out of shared packages.
8. Do not duplicate components merely because both web and mobile applications exist.

---

## Overall Architecture

```text
                         JoinOrigin
                             │
             ┌───────────────┴───────────────┐
             │                               │
         apps/web                       apps/mobile
         Next.js                        React Native
         Web + PWA                      iOS + Android
             │                               │
             └───────────────┬───────────────┘
                             │
                         packages/
                             │
        ┌────────────┬───────┼────────┬───────────┐
        │            │       │        │           │
      types        schemas   api     logic       state
                    │       │        │           │
        └────────────┴───────┼────────┴───────────┘
                             │
                           hooks
                             │
                             ▼
                             ui
                   ┌─────────┼─────────┐
                   │         │         │
              universal     web      native
              components  overrides overrides
```

Example package organization:

```text
apps/
  web/
    app/
    components/
    server/

  mobile/
    app/
    components/

packages/
  types/
  schemas/
  api/
  logic/
  state/
  hooks/
  platform/
  design/
  ui/
  utils/
```

### Monorepo Root: `app/` (UWP Root Minimalism)

Per [UWP ARCHITECTURE.md §7.1 Root Minimalism](../ARCHITECTURE.md), the repo
root contains only `AGENTS.md` + `.gitignore` + `app/`. **The JoinOrigin
frontend monorepo lives inside `app/`**: `app/apps/web`, `app/apps/mobile`,
`app/packages/` (`@joinorigin/design`, `@joinorigin/ui`), `app/tests/e2e`
(Playwright), and all workspace config (`package.json`,
`pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, ESLint/Prettier,
`.npmrc`). All pnpm/turbo commands run from `app/`.

---

# React Native Web

React Native Web is a compatibility layer that lets **React Native-style components render in the browser**.

Instead of automatically creating separate basic components:

```text
Web                          Native
─────────────────           ─────────────────
<div>                       <View>
<button>                    <Pressable>
<span>/<p>                  <Text>
CSS                         StyleSheet
```

prefer React Native primitives for UI that can reasonably be universal.

For example:

```tsx
import { Pressable } from "react-native";
import styled from "styled-components/native";

const Button = styled(Pressable)`
  padding: 12px 16px;
  border-radius: 8px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export function SaveButton() {
  return (
    <Button>
      <Label>Save</Label>
    </Button>
  );
}
```

The same component can run on:

```text
                    SaveButton.tsx
                          │
                  React Native UI
                          │
              styled-components/native
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
            Web          iOS        Android
             │
             ▼
            PWA
```

On iOS and Android, React Native renders native UI.

On web, React Native Web translates the React Native primitives and styles into browser-compatible DOM/CSS behavior.

Therefore, do **not** automatically create separate web and native versions of every component.

---

# Universal Components

Prefer one universal implementation when the UI and behavior naturally work across platforms.

Examples include:

```text
Button
Card
Input
Avatar
Badge
MessageBubble
RoomCard
MemberCard
StatusIndicator
LoadingIndicator
Simple forms
Simple lists
Dialogs
Basic navigation elements
```

These belong in shared UI:

```text
packages/ui/
  Button.tsx
  Card.tsx
  Input.tsx
  Avatar.tsx
  Badge.tsx
  MessageBubble.tsx
  RoomCard.tsx
  MemberCard.tsx
```

Both applications should be able to write:

```tsx
import { RoomCard } from "@joinorigin/ui";
```

Conceptually:

```text
                         RoomCard.tsx
                              │
                    shared implementation
                              │
                 styled-components/native
                              │
               ┌──────────────┴──────────────┐
               │                             │
        Next.js + RN Web              React Native
               │                       │          │
               ▼                       ▼          ▼
          Web / PWA                   iOS      Android
```

---

# styled-components

**styled-components is the primary JoinOrigin styling system.**

For universal components, use:

```ts
import styled from "styled-components/native";
```

Example:

```tsx
const Card = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title}px;
  font-weight: 600;
`;
```

For intentionally web-only DOM components, normal styled-components may be used:

```tsx
import styled from "styled-components";

const DesktopWorkspace = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  height: 100vh;
`;
```

The general rule is:

```text
Universal component
        │
        ▼
styled-components/native
        │
        ▼
React Native primitives
        │
   ┌────┴─────┐
   ▼          ▼
Native      RN Web


Web-specific component
        │
        ▼
styled-components
        │
        ▼
DOM + Browser CSS


Native-specific component
        │
        ▼
styled-components/native
        │
        ▼
React Native
```

Do not introduce Tailwind/NativeWind as an alternative styling system unless there is an explicit architectural decision to do so.

Avoid mixing styling systems arbitrarily between components.

---

# Design System

Keep JoinOrigin's **design tokens separate from styled-components**.

For example:

```text
packages/design/
  colors.ts
  spacing.ts
  typography.ts
  radius.ts
  breakpoints.ts
  theme.ts
```

Example:

```ts
export const theme = {
  colors: {
    background: "...",
    surface: "...",
    surfaceElevated: "...",
    primary: "...",
    text: "...",
    textMuted: "...",
    destructive: "...",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
};
```

Then consume tokens through styled-components:

```tsx
const RoomCard = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
```

Architecture:

```text
                    JoinOrigin Design System
                             │
                        Design Tokens
                             │
              ┌──────────────┴──────────────┐
              │                             │
     styled-components/native        styled-components
              │                             │
       Universal/Native                 Web-only
              │                             │
        ┌─────┼─────┐                       │
        ▼     ▼     ▼                       ▼
       Web   iOS  Android                  DOM
```

Do not scatter arbitrary colors, spacing, typography, or other design values throughout components when an appropriate design token exists.

---

# Platform-Specific Implementations

React Native Web does **not** mean every interface must be identical across web and mobile.

Web and native have different:

```text
interaction models
screen sizes
navigation conventions
platform APIs
input mechanisms
libraries
performance characteristics
desktop capabilities
```

When these differences become meaningful, use platform-specific implementations.

For example:

```text
FilePicker.web.tsx
FilePicker.native.tsx

Navigation.web.tsx
Navigation.native.tsx

DataGrid.web.tsx
DataGrid.native.tsx

RoomLayout.web.tsx
RoomLayout.native.tsx

Workspace.web.tsx
Workspace.native.tsx
```

Consumers should still use the same abstraction:

```tsx
import { FilePicker } from "@joinorigin/ui/FilePicker";

<FilePicker />
```

The platform resolver selects the implementation:

```text
                      <FilePicker />
                            │
                            ▼
                     platform resolver
                    /                 \
                   /                   \
                Web                   Native
                 │                      │
                 ▼                      ▼
     FilePicker.web.tsx      FilePicker.native.tsx
                 │                      │
                 ▼                      ▼
        Browser File API        Native Picker API
```

The **public component interface should remain consistent** whenever practical.

For example:

```ts
interface FilePickerProps {
  multiple?: boolean;
  onFilesSelected(files: SelectedFile[]): void;
}
```

Both:

```text
FilePicker.web.tsx
FilePicker.native.tsx
```

should implement that same contract.

---

# Platform-Specific Services

The same pattern applies outside UI.

For example:

```text
packages/platform/

  storage/
    storage.web.ts
    storage.native.ts

  notifications/
    notifications.web.ts
    notifications.native.ts

  clipboard/
    clipboard.web.ts
    clipboard.native.ts

  downloads/
    downloads.web.ts
    downloads.native.ts

  auth/
    auth.web.ts
    auth.native.ts
```

Define shared contracts:

```ts
export interface StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}
```

Web implementation:

```ts
export const storage: StorageAdapter = {
  async get(key) {
    return localStorage.getItem(key);
  },

  async set(key, value) {
    localStorage.setItem(key, value);
  },

  async remove(key) {
    localStorage.removeItem(key);
  },
};
```

Native implementation:

```ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage: StorageAdapter = {
  get: AsyncStorage.getItem,
  set: AsyncStorage.setItem,
  remove: AsyncStorage.removeItem,
};
```

Higher-level application code should simply use:

```ts
import { storage } from "@joinorigin/platform/storage";

await storage.set("token", token);
```

It should not need to know which implementation is running.

---

# Shared Logic + Platform View Pattern

Prefer separating application behavior from platform-specific presentation.

For example:

```text
useRoomMessages.ts
RoomMessages.web.tsx
RoomMessages.native.tsx
```

Shared logic:

```text
                 useRoomMessages()
                         │
          ┌──────────────┴──────────────┐
          │                             │
RoomMessages.web.tsx         RoomMessages.native.tsx
          │                             │
          ▼                             ▼
 Desktop / PWA UX                  Touch UX
```

`useRoomMessages()` can own shared behavior such as:

```text
loading messages
sending messages
pagination
reactions
typing state
Matrix events
error handling
optimistic updates
```

while `.web.tsx` and `.native.tsx` control presentation and platform interaction.

---

# Complex Web Experiences

Do not force complex desktop experiences through React Native primitives solely to achieve code reuse.

Examples include:

```text
large administration tables
complex data grids
multi-column moderation interfaces
desktop workspace layouts
drag-and-drop interfaces
advanced keyboard shortcuts
desktop context menus
resizable panels
complex browser-based editors
```

These may intentionally use:

```text
Component.web.tsx
+
styled-components
+
DOM/browser APIs
```

while native gets a purpose-built touch interface:

```text
Component.native.tsx
+
styled-components/native
+
React Native APIs
```

The underlying:

```text
types
data
API calls
business logic
state
hooks
permissions
validation
```

should still be shared whenever possible.

---

# Next.js Boundary

Next.js is not merely another React rendering target. It also contains server-specific functionality.

Keep things such as:

```text
Server Components
Server Actions
Route Handlers
middleware
cookies()
headers()
server authentication
Node-only APIs
```

inside:

```text
apps/web/
```

Shared packages should generally **not depend on Next.js**.

Correct dependency direction:

```text
              Next.js Web/PWA
                     │
                     ▼
              shared packages
                     ▲
                     │
             React Native
              iOS / Android
```

Avoid:

```text
shared package
      │
      ▼
next/headers
next/cookies
next/navigation
Next.js server APIs
```

because doing so prevents React Native from consuming that package.

---

# Decision Process for New Components

When implementing a new JoinOrigin feature:

```text
                         New Feature
                              │
                              ▼
               Share types / logic / API
                              │
                              ▼
                 Does the UI naturally work
                    across all platforms?
                       /             \
                     YES              NO
                      │                │
                      ▼                ▼
              Component.tsx      Same component API
                      │                │
                      ▼          ┌─────┴──────┐
       styled-components/native │            │
                      │          ▼            ▼
                      │     .web.tsx     .native.tsx
                      │          │            │
                      │     styled-       styled-
                      │     components    components/native
                      │          │            │
                      └──────────┴─────┬──────┘
                                      │
                                      ▼
                           Same domain/API model
```

Before creating separate platform implementations, ask:

**Can this reasonably be one React Native Web component?**

If yes, prefer the universal component.

If no, split the implementation while preserving shared contracts and shared logic.

---

# Core Rule

**Share domain logic aggressively.**

**Prefer universal React Native Web components styled with `styled-components/native` when practical.**

**Use `styled-components` for intentionally web-specific DOM components.**

**Use `.web.tsx` and `.native.tsx` when the platforms genuinely require different behavior or UX.**

**Keep the same public interface across platform implementations whenever practical.**

**Do not duplicate code simply because JoinOrigin targets Web, PWA, iOS, and Android.**

**Do not introduce competing styling systems without an explicit architectural decision.**

---

## Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Related:** [phase-1-patterns.md](phase-1-patterns.md), [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md)
