---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

Ara is a framework to develop and integrate Micro-frontends easily using [Airbnb's Hypernova](https://github.com/airbnb/hypernova). We tend to call **Nova** to each Hypernova service.

## Installing Ara CLI

Ara has it's own [CLI](https://github.com/ara-framework/ara-cli) to perform common tasks such as create Nova services, and more.

Install Ara CLI:

```shell
npm i -g ara-cli
```

## Create a Nova service

Ara CLI supports several templates for different JavaScript libraries such as:

- [React](https://github.com/ara-framework/create-hypernova-react)
- [Vue.js](https://github.com/ara-framework/create-hypernova-vue)
- [Angular](https://github.com/ara-framework/create-hypernova-angular)
- [Svelte](https://github.com/ara-framework/create-hypernova-svelte)
- [Preact](https://github.com/ara-framework/create-hypernova-preact)
- [Hyperapp](https://github.com/ara-framework/create-hypernova-hyperapp)

You can create a new Nova service running the following command:

```shell
ara new:nova novas/global 
```

The command by default creates a Nova service using Vue.js but you can use another template using the `-t` parameter:

```shell
ara new:nova novas/global -t vue
```

For using only **Client-Side rendering** type `n` when the command asks `Do you want to include Server-Side Rendering (SSR) (Y/n)`.

Read more about the [SPA architecture](/website/docs/nova-spa-architecture).

The service created contains the entry point for the Nova server in `src/index.js` and the entry point for the browser in `src/client.js`.

## Run the Nova service.

```shell
npm run dev
```

This command executes the Nova sever on http://localhost:3000 and restarts the server every time the code changes.

## Test the Nova service

Once the Nova service is running you can make a `POST` request to http://localhost:3000/batch using a payload like:

```json
{
  "uuid": {
    "name": "Example",
    "data": {
      "title": "Ara Framework"
    }
  }
}
```

You can request more than one view:

```json
{
  "uuid": {
    "name": "Example",
    "data": {
      "title": "Ara Framework"
    }
  },
  "uuid-2": {
    "name": "Example",
    "data": {
      "title": "Ara Framework 2"
    }
  }
}
```

The `results` property in the response contains the `html` of view rendered by the Nova.

Example:

```json
{
  "success": true,
  "error": null,
  "results": {
    "uuid": {
      "name": "Example",
      "html": "<div data-hypernova-key=\"Example\" data-hypernova-id=\"4d9e81bd-6413-4661-ab56-ed5bb4f59cae\"><h1 data-server-rendered=\"true\">Ara Framework</h1></div>\n<script type=\"application/json\" data-hypernova-key=\"Example\" data-hypernova-id=\"4d9e81bd-6413-4661-ab56-ed5bb4f59cae\"><!--{\"title\":\"Ara Framework\"}--></script>",
      "meta": {},
      "duration": 1.210146,
      "statusCode": 200,
      "success": true,
      "error": null
    },
    "uuid-2": {
      "name": "Example",
      "html": "<div data-hypernova-key=\"Example\" data-hypernova-id=\"dea96da6-ef16-40fd-84ec-85bca4c7bc5d\"><h1 data-server-rendered=\"true\">Ara Framework 2</h1></div>\n<script type=\"application/json\" data-hypernova-key=\"Example\" data-hypernova-id=\"dea96da6-ef16-40fd-84ec-85bca4c7bc5d\"><!--{\"title\":\"Ara Framework 2\"}--></script>",
      "meta": {},
      "duration": 0.461026,
      "statusCode": 200,
      "success": true,
      "error": null
    }
  }
}
```
