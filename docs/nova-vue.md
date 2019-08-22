---
id: nova-vue
title: Nova Vue.js
sidebar_label: Vue.js
---

[Vue.js](https://github.com/vuejs/vue) bindings for [Hypernova](https://github.com/airbnb/hypernova).
## Install package

```shell
npm install --save hypernova-vue
```

## Usage
The bindings for hypernova render the Nova views on the server and hydrate them on the browser to make them interactive. It's also know as Univeral Rendering.  

### Server Side

On the server, wraps the component in a function to render it to a HTML string given its props.

```js
import hypernova from 'hypernova/server'
import { renderVue, Vue } from 'hypernova-vue'

import Example from './components/Example.vue'

hypernova({
  getComponent (name) {
    if (name === 'Example') {
      return renderVue(name, Vue.extend(Example))
    }

    return null
  }
})

```

### Client Side

On the client, it scans the DOM for any server-side rendered instances of it. It then hydrate those components using the server-specified props.

```js    
import { renderVue, Vue } from 'hypernova-vue'

import Example from './components/Example.vue'

renderVue('Example', Vue.extend(Example))
```