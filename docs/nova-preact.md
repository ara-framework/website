---
id: nova-preact
title: Nova Preact
sidebar_label: Preact
---

[Preact](https://preactjs.com) bindings for [Hypernova](https://github.com/airbnb/hypernova).

## Install package

```shell
npm install hypernova-preact
```

## Usage
The bindings for hypernova render the Nova views on the server and hydrate them on the browser to make them interactive. It's also know as Univeral Rendering.  

### Server Side

On the server, wraps the component in a function to render it to a HTML string given its props.

```js
import hypernova from 'hypernova/server';
import { renderPreact } from 'nova-preact';

import Example from './components/Example';

hypernova({
  getComponent(name) {
    if (name === 'Example') {
      return renderPreact(name, Example);
    }

    return null;
  }
});

```

### Client Side

On the client, it scans the DOM for any server-side rendered instances of it. It then hydrate those components using the server-specified props.

```js
import { renderReact } from 'nova-preact';

import Example from './components/Example';

renderPreact('Example', Example);
```

## Generate Nova Service using Preact

Run `new:nova` command using the [CLI](https://github.com/ara-framework/ara-cli)

```shell
ara new:nova -t preact nova
```

### Run it

Run Nova service on http://localhost:3000

```shell
yarn dev
```

Integrate it in your website using [Nova Proxy](https://github.com/ara-framework/nova-proxy), see details on page [Render views on page](/website/docs/render-on-page).
