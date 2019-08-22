---
id: nova-angular
title: Nova Angular
sidebar_label: Angular
---

[Angular]https://angular.io/) bindings for [Hypernova](https://github.com/airbnb/hypernova).
## Install package

```shell
npm install --save hypernova-angular
```

## Usage
The bindings for hypernova render the Nova views on the server and hydrate them on the browser to make them interactive. It's also know as Univeral Rendering.  

### Server Side

On the server, wraps the component in a function to render it to a HTML string given its props.

```ts
import 'core-js/proposals/reflect-metadata';
import 'zone.js';

import * as hypernova from 'hypernova/server'
import { renderAngular } from 'hypernova-angular'

import { ExampleModule } from './components/example/example.module'
import { ExampleComponent } from './components/example/example.component'

hypernova({
  getComponent (name: string) {
    if (name === 'Example') {
      return renderAngular(name, ExampleComponent, ExampleModule)
    }
  }
})

```

### Client Side

On the client, it scans the DOM for any server-side rendered instances of it. It then hydrate those components using the server-specified props.

```ts    
import 'core-js/proposals/reflect-metadata';
import 'zone.js';

import { renderAngular } from 'hypernova-angular'

import { ExampleModule } from './components/example/example.module'
import { ExampleComponent } from './components/example/example.component'

renderAngular('Example', ExampleComponent, ExampleModule)
```