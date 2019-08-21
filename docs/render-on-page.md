---
id: render-on-page
title: Render views on page
sidebar_label: Render views on page
---

We created a base architecture called Nova to include Nova views into the pages. You can see the detailed explanation about the architecture design [here](/website/docs/nova-architecture).

## Setup website consumer

In this example, we'll use [Express](https://expressjs.com/) as Nova consumer and [Handlebars](https://handlebarsjs.com/) as template engine to render a basic page where the Nova view will be included.

We need first to generate the website using `express-generator` with the flag `-v hbs` to set Handlebars as template engine.

```shell
 npx express-generator -v hbs website
```

We need to install the [Nova directive](https://github.com/ara-framework/hypernova-handlebars-directive) for Handlebars.

```shell
npm i --save hypernova-handlebars-directive
```

Once it's installed, we need to register it on the `app.js` file

```js
var app = express();

var hbs = require('hbs');
var directive = require('hypernova-handlebars-directive');
```

We can use the Nova directive in the main page `views/index.hbs`. You need to pass the `name` and the data using the `data` attribute or `data-<field>` for each data field.

```hbs
<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>

{{>nova name="Example" data-title="Ara Framework" }}
```

Finally, we can run the website on http://localhost:8000.

```shell
PORT=8000 npm run start
```

You can notice the page is not rendering the `Example` view yet. Taking a look in the HTML you can notice it's rendering a placeholder where the Nova view will be included.

```html
<div data-hypernova-key="Example" data-hypernova-id="f07ac8b3-9256-49db-90b9-fb30789a8f85"></div>
<script type="application/json" data-hypernova-key="Example" data-hypernova-id="f07ac8b3-9256-49db-90b9-fb30789a8f85">
    <!--{"title":"Ara Framework"}-->
</script>
```

## Server-side include with Nova Proxy

[Nova Proxy](https://github.com/ara-framework/nova-proxy) is a proxy that server-side include Nova views on the placeholders rendered by the Nova directives.

You can use the CLI to run it locally, but you need to create a configuration file first.

```shell
touch nova-proxy.json
``` 

`nova-proxy.json`

```json
{
  "locations": [
    {
      "path": "/",
      "host": "http://localhost:8000",
      "modifyResponse": true
    }
  ]
}
```
Before to run the command we need to set the `HYPERNOVA_BATCH` variable using the Nova service endpoint.

```shell
export HYPERNOVA_BATCH=http://localhost:3000/batch
```

You need to run the following command where the noxa-proxy.json file was created or pass the `--config` parameter with the configuration file path.

```
ara run:proxy --config ./nova-proxy.json
```

The command runs Nova Proxy on http://localhost:8080. Now the page displays the Nova view.




