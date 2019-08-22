---
id: nova-react
title: Nova React
sidebar_label: React
---

[React](https://reactjs.org/) bindings for [Hypernova](https://github.com/airbnb/hypernova). This package extends [hypernova-react](https://github.com/airbnb/hypernova-react)

## Install package

```shell
npm install --save nova-react
```

## Usage
The bindings for hypernova render the Nova views on the server and hydrate them on the browser to make them interactive. It's also know as Univeral Rendering.  

### Server Side

On the server, wraps the component in a function to render it to a HTML string given its props.

```js
import hypernova from 'hypernova/server';
import { renderReact } from 'nova-react';

import Example from './components/Example';

hypernova({
  getComponent(name) {
    if (name === 'Example') {
      return renderReact(name, Example);
    }

    return null;
  }
});

```

### Client Side

On the client, it scans the DOM for any server-side rendered instances of it. It then hydrate those components using the server-specified props.

```js
import { renderReact } from 'nova-react';

import Example from './components/Example';

renderReact('Example', Example);
```