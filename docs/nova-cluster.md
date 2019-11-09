---
id: nova-cluster
title: Nova Cluster
sidebar_label: Nova Cluster
---

Nova Cluster is a Micro-frontends (Nova) aggregator to enable Nova Proxy to resolve the views it needs from multiple Microfrontends without know which one is responsible to render them. You can see the detailed explanation about the architecture design [here](/website/docs/nova-architecture).

## Setup Environment

We'll create two simple Micro-frontends, `foo` and `bar`.

### Foo Nova

Creates `foo` Nova:

```shell
ara new:nova -t vue foo
```

The previous command creates a basic Micro-frontent (Nova) using Vue.js into the `foo` folder.

We need to modify the `Example.vue` component adding a prefix in the title.

`src/components/Example.vue`

```vue
<template>
  <h1>FOO - {{title}}</h1>
</template>

<script>
export default {
  props: ['title']
}
</script>
```

Finally we need to change the view name from `Example` to `Foo` in the server entry point.

`src/index.js`

```js
...
import Example from './components/Example.vue'

hypernova({
  ...
  getComponent (name) {
    if (name === 'Foo') {
      return renderVue(name, Vue.extend(Example))
    }
  },
  ....
})
```

Runs Nova service on `3001` port

```shell
PORT=3001 npm run dev
```

More details about how test the Nova service [here.](/website/docs/quick-start#test-the-nova-service)

### Bar Nova

Creates `bar` Nova:

```shell
ara new:nova -t vue bar
```

The previous command creates a basic Micro-frontent (Nova) using Vue.js into the `bar` folder.

We need to modify the `Example.vue` component adding a prefix in the title.

`src/components/Example.vue`

```vue
<template>
  <h1>BAR - {{title}}</h1>
</template>

<script>
export default {
  props: ['title']
}
</script>
```

Finally we need to change the view name from `Example` to `Bar` in the server entry point.

`src/index.js`

```js
...
import Example from './components/Example.vue'

hypernova({
  ...
  getComponent (name) {
    if (name === 'Bar') {
      return renderVue(name, Vue.extend(Example))
    }
  },
  ....
})
```

Runs Nova service on `3002` port

```shell
PORT=3002 npm run dev
```

More details about how test the Nova service [here.](/website/docs/quick-start#test-the-nova-service)

## Configure Nova Cluster

Nova Cluster needs a configuration file in order to resolve the views with their Nova services.

Creates a file name `views.json` in the root folder with the following configuration.

```json
{
  "Foo": {
    "server": "http://localhost:3001/batch"
  },
  "Bar": {
    "server": "http://localhost:3002/batch"
  }
}
```

## Run and Test Nova Cluster

Runs Nova Cluster on http://0.0.0.0:8000 using the CLI.

```shell
ara run:cluster --config ./views.json
```

Once the Nova Cluster is running we can make a `POST` request to http://localhost:8000/batch using a payload like:

```json
{
  "foo": {
    "name": "Foo",
    "data": {
      "title": "Ara Framework"
    }
  },
  "bar": {
    "name": "Bar",
    "data": {
      "title": "Ara Framework"
    }
  }
}
```

The `results` property in the response contains the views rendered by the `Foo` and `Bar` services. In this way we can on-board a new Micro-frontend without modify the underlying services.

Example:

```json
{
    "results": {
        "bar": {
            "name": "Bar",
            "html": "<div data-hypernova-key=\"Bar\" data-hypernova-id=\"7ccb575c-53c6-4598-bbd6-b42df842ef9e\"><h1 data-server-rendered=\"true\">Bar - Ara Framework</h1></div>\n<script type=\"application/json\" data-hypernova-key=\"Bar\" data-hypernova-id=\"7ccb575c-53c6-4598-bbd6-b42df842ef9e\"><!--{\"title\":\"Ara Framework\"}--></script>",
            "duration": 0.986263,
            "success": true,
            "error": {
                "name": "",
                "message": ""
            }
        },
        "foo": {
            "name": "Foo",
            "html": "<div data-hypernova-key=\"Foo\" data-hypernova-id=\"4f2348e4-e776-4643-99ca-279db8950343\"><h1 data-server-rendered=\"true\">FOO - Ara Framework</h1></div>\n<script type=\"application/json\" data-hypernova-key=\"Foo\" data-hypernova-id=\"4f2348e4-e776-4643-99ca-279db8950343\"><!--{\"title\":\"Ara Framework\"}--></script>",
            "duration": 0.360844,
            "success": true,
            "error": {
                "name": "",
                "message": ""
            }
        }
    }
}
```

### Integrating with Nova Proxy

Set the `HYPERNOVA_BATCH` env variable using the Nova Cluster endpoint instead of a Nova service endpoint.

```shell
export HYPERNOVA_BATCH=http://localhost:8000/batch
```

It's transparent for Nova Proxy because the communication interface between Nova Proxy with Nova Service and Nova Cluster are the same.

More details how to make server-side includes using Nova Proxy [here.](/website/docs/render-on-page)
