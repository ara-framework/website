---
id: nova-vue-bridge
title: Nova Vue Bridge
sidebar_label: Vue.js
---

## Install

```shell
npm install nova-vue-bridge
```

## Usage

The `Nova` component requires the props `name` and `data`

- `name` is the registered view in Hypernova.
- `data` is the data necessary to render the view.

```vue
<template>
  <div class="container">
    <nova name="Example" :data="{ title: 'Ara Framework' }" />
  </div>
</template>

<script>
import Nova from 'nova-vue-bridge'

export default {
  components: {
    Nova
  },
}
</script>
```