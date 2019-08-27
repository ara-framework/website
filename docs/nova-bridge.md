---
id: nova-bridge
title: What is a Nova Bridge?
sidebar_label: What is it?
---

The Nova Bridge enables us to use Nova Views on any view library such as React, Vue.js and others. This is helpful to integrate Nova Views on frameworks such as Nuxt.js, Next.js, Gatsby.js, and others.

The Nova Bridge renders a placeholder (aka Nova Directive) where the Nova Views are included.

Placeholder:

```html
<div data-hypernova-key="NavBar" data-hypernova-id="d0a0b082-dad0-4bf2-ae4f-08eff16575b4"></div>
<script type="application/json" data-hypernova-key="NavBar" data-hypernova-id="d0a0b082-dad0-4bf2-ae4f-08eff16575b4"><!--{"brand":"Ara Framework","links":[{"url":"https://github.com/ara-framework","text":"Github"}]}--></script> 
```

## Client-Side Rendering

![Nova Bridge diagram](/website/img/1_1LXUoTxvmX7GNsmLlFv-eA.png)

1. The Nova Bridge emits a `NovaMount` event to let now to the Nova service that a view needs to be rendered and mounted.
2. The client-side entry point listens to the event and uses the event payload to render the view.
3. The client-side entry point mounts the rendered view in the Nova Bridge placeholder.


Example using [hypernova-vue](website/docs/nova-vue):

```js
import { renderClient } from 'hypernova-vue'

document.addEventListener('NovaMount', (event) => {
  const { detail: { name, id } } = event
  if (name === 'NavBar') {
    return renderClient(name, NavBar, id)
  }
})
```

## Server-Side Rendering 
The placeholder is used by [Nova Proxy](https://github.com/ara-framework/nova-proxy) or [Nova Static](https://github.com/ara-framework/nova-static) to Server-Side Include the html rendered by [Hypernova](https://github.com/airbnb/hypernova). You can learn more about the Nova architecture [here](/website/docs/nova-architecture).
