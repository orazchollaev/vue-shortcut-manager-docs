# vue-shortcut-manager

> Zero-config keyboard shortcut manager for Vue 3. No plugin, no `main.ts` setup needed.

[![npm version](https://img.shields.io/npm/v/vue-shortcut-manager?color=42b883&label=npm)](https://www.npmjs.com/package/vue-shortcut-manager)
[![npm downloads](https://img.shields.io/npm/dm/vue-shortcut-manager?color=42b883)](https://www.npmjs.com/package/vue-shortcut-manager)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![vue](https://img.shields.io/badge/vue-3.x-42b883.svg)](https://vuejs.org/)
[![github](https://img.shields.io/badge/github-repo-181717.svg)](https://github.com/orazchollaev/vue-shortcut-manager)

---

## Features

- **Zero setup** — just import and use, no `app.use()` needed
- `useShortcut()` — register a single shortcut
- `useShortcuts()` — register multiple shortcuts at once
- `useShortcutScope()` — activate a named scope while component is mounted
- `useShortcutList()` — reactive list of all shortcuts
- `<ShortcutCheatsheet />` — built-in modal, open with `shift+?`
- **Sequence shortcuts** — `g h`, `g i` style combos
- **`whenFocused`** — only fire when a specific element is focused
- **Conflict detection** — warns on duplicate key registrations
- **Auto cleanup** — unregisters on component unmount
- Full TypeScript support

---

## Install

```bash
pnpm add vue-shortcut-manager
```

---

## Usage

### Basic shortcut

```vue
<script setup lang="ts">
import { useShortcut } from "vue-shortcut-manager";

useShortcut("ctrl+k", () => openSearch(), { description: "Open search" });
</script>
```

### Multiple shortcuts

```vue
<script setup lang="ts">
import { useShortcuts } from "vue-shortcut-manager";

useShortcuts([
  { key: "ctrl+s", handler: save, description: "Save" },
  { key: "ctrl+z", handler: undo, description: "Undo" },
  { key: "ctrl+shift+z", handler: redo, description: "Redo" },
]);
</script>
```

### Scoped shortcuts

```vue
<script setup lang="ts">
import { useShortcutScope, useShortcut } from "vue-shortcut-manager";

useShortcutScope("editor");

useShortcut("ctrl+b", toggleBold, { scope: "editor", description: "Bold" });
</script>
```

### Sequence shortcuts

```vue
<script setup lang="ts">
import { useShortcut } from "vue-shortcut-manager";

useShortcut("g h", () => router.push("/"), { description: "Go home" });
useShortcut("g i", () => router.push("/inbox"), { description: "Go inbox" });
</script>
```

### whenFocused

Only fires when a specific element is focused.

```vue
<template>
  <input ref="searchInput" placeholder="Search..." />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useShortcut } from "vue-shortcut-manager";

const searchInput = ref<HTMLElement | null>(null);

useShortcut("escape", () => clearSearch(), { whenFocused: searchInput });
useShortcut("ctrl+enter", () => submit(), { whenFocused: searchInput });
</script>
```

### Cheatsheet modal

```vue
<template>
  <RouterView />
  <ShortcutCheatsheet />
</template>

<script setup lang="ts">
import { ShortcutCheatsheet } from "vue-shortcut-manager";
</script>
```

Press `shift+?` to open. Custom toggle key: `<ShortcutCheatsheet toggle-key="ctrl+/" />`

---

## Key syntax

Keys are case-insensitive strings joined with `+`:

```
ctrl+k        ctrl+shift+z    meta+s
escape        enter           space
up            down            left            right
backspace     tab             delete
g h           g i             (sequences, space-separated)
```

Modifier keys: `ctrl`, `shift`, `alt`, `meta`

---

## Nuxt 4

```ts
// plugins/shortcut-manager.client.ts
import { defineNuxtPlugin } from "#app";
import { getManager } from "vue-shortcut-manager";

export default defineNuxtPlugin(() => {
  getManager();
});
```

> The `.client.ts` suffix ensures this runs in the browser only. Composables automatically skip execution during SSR.

---

## API

### `useShortcut(key, handler, options?)`

| Option        | Type                                              | Description                       |
| ------------- | ------------------------------------------------- | --------------------------------- |
| `description` | `string`                                          | Label shown in cheatsheet         |
| `scope`       | `string`                                          | Scope name (default: `'global'`)  |
| `whenFocused` | `Ref<HTMLElement \| null> \| HTMLElement \| null` | Only fire when element is focused |

### `useShortcuts(shortcuts[])` — register multiple at once

### `useShortcutScope(scope)` — activate scope on mount, restore on unmount

### `useShortcutList(scope?)` — returns `{ shortcuts }`, a reactive list

### `<ShortcutCheatsheet toggle-key="shift+?" />` — built-in modal

---

## TypeScript

```ts
import type {
  Shortcut,
  RegisteredShortcut,
  ShortcutManagerOptions,
} from "vue-shortcut-manager";
```

---

## License

MIT
