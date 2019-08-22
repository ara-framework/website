---
id: nova-svelte
title: Nova Svelte
sidebar_label: Svelte
---

[Svelte](https://svelte.dev/) bindings for [Hypernova](https://github.com/airbnb/hypernova).
## Install package

```shell
npm install --save hypernova-svelte
```

## Usage
The bindings for hypernova render the Nova views on the server and hydrate them on the browser to make them interactive. It's also know as Univeral Rendering.  

### Server Side

On the server, wraps the component in a function to render it to a HTML string given its props.

```js
import hypernova from 'hypernova/server'
import { renderSvelte } from 'hypernova-svelte'

import Example from './components/Example.svelte'

hypernova({
  getComponent (name) {
    if (name === 'Example') {
      return renderSvelte(name, Example)
    }

    return null
  }
})

```

### Client Side

On the client, it scans the DOM for any server-side rendered instances of it. It then hydrate those components using the server-specified props.

```js    
import { renderSvelte } from 'hypernova-svelte'

import Example from './components/Example.svelte'

renderSvelte('Example', Example)
```