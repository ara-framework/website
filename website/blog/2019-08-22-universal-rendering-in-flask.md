---
title: Universal Rendering in Flask using Vue.js and Ara Framework
author: Felipe Guizar Diaz
authorURL: https://twitter.com/felipeguizard
authorImageURL: https://www.gravatar.com/avatar/5c0f68aec4986617a543a5699032075e
authorTwitter: felipeguizard
---

Universal Rendering consists in server-side rendered pages and making them interactive on the browser, using the same view components built with React, Vue.js, Angular, etc. 

Nowadays, JavaScript frameworks such as [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/) and [NgUniversal](https://github.com/angular/universal) make this duty easier. However, how can we achieve it on non JavaScript frameworks like Flask?

<!--truncate-->

## Nova Proxy

Nova proxy is a service to implement Unversal Rendering with any view library (React, Vue.js, etc) on any web platform (Laravel, Flask, etc). For example, in this demo we'll render a view using Vue.js into a web application built with Flask.

How it works:

![](https://cdn-images-1.medium.com/max/2400/1*0_KCs-IFVCIN8J5RwP7uFg.png)
1. A user requests a page to the **Nova Proxy**.

2. The **Nova Proxy** passes the request to the website server.

3. The website uses a the **Nova Directive** to render the placeholders where the Nova views should be included.

4. The website sends back the HTML generated to the **Nova Proxy**.

5. The **Nova Proxy** includes the Nova views in the placeholders and sends back the HTML to the browser.

Finally, on the browser, JavaScript is used to progressively enhance the application and make it interactive. Read more [here](/website/docs/nova-architecture) about the Nova Architecture.


## Set Up The Flask App

We'll use [SAO](https://github.com/saojs/sao) to generate the base Flask application.

Install SAO:

```shell
npm i -g sao
```


Create the Flask app:

```shell
sao marconi1992/create-flask-app ara-flask
```

### Set Up The Nova Directive

Notice the `requirements.txt` file contains a package named [hypernova_jinja2_directive](https://github.com/ara-framework/hypernova-jinja2-directive). It's used to render the Nova directives using the template engine for Flask (Jinja2).


Set up the `nova` helper for `jinja` into `__init__.py`:

```python
from flask import Flask
from hypernova_jinja2_directive import nova
# Initialize the app
app = Flask(__name__, instance_relative_config=True)

# Load the views
from app import views

# Load the config file
app.config.from_object('config')


app.jinja_env.globals.update(nova=nova)
```

### Run Flask App

The application generated contains a `docker-compose.yml` file to run the Flask app.

Run it:

```shell
docker-compose up -d
```

Test the Flask application on http://localhost:8000/.

Browser:

![flask page](/website/img/blog/flask-page.png)


## Set up the Nova service

We'll create a Nova service using Vue.js.

Install [Ara CLI](https://github.com/ara-framework/ara-cli):

```shell
npm i -g ara-cli
```

Create Nova service:

```shell
ara new:nova -t vue nova
```

Go to the Nova service folder:

```shell
cd nova
```

Run Nova service:

```shell
npm run dev
```

The Nova service runs on http://localhost:3000.

### Test the Nova Service.

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

The `results` property in the response contains the `html` of the view rendered by the Nova service.

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
    }
  }
}
```

### Update the Example view

The `Example` view is rendering only a simple heading. We can make it interactive adding an input element that changes the heading text.

Replace the `nova/src/components/Example.vue` with the following code:

```vue
<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <input type="text" v-model="title">
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
```

## Set up Nova Proxy

Create a configuration file for Nova Proxy in the root folder:

```
touch nova-proxy.json
```

Add the following configuration in `nova-proxy.json` file to proxy the incoming requests to the Flask web server.

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

### Run Nova Proxy

Before running the command we need to set the `HYPERNOVA_BATCH` variable using the Nova service endpoint.

```shell
export HYPERNOVA_BATCH=http://localhost:3000/batch
```

You need to run the following command where the `noxa-proxy.json` file was created or pass the `--config` parameter with the configuration file path.

```
ara run:proxy --config ./nova-proxy.json
```

The command runs Nova Proxy on http://localhost:8080.

### Render Nova views (Vue.js)

Use the Nova directive in a Jinja2 template page:

`app/templates/index.html`

```jinja
{% extends "base.html" %}
{% block body %}
  <div class="container">
    <h1 class="title">Hello Flask</h1>
    {{ nova('Example', {'title':'Ara Framework'}) }}
  <div>
{% endblock %}
```

The `nova` helper requires the `name` of the view, and the `data` necessary to render it.

Open the page on http://localhost:8080 and see how the Nova view is rendered.

![flask-example-vue-render](/website/img/blog/flask-example-vue-render.png)

The rendered view is not interactive yet, if we type something in the input element the heading text is not updated. This is happening because we're not loading the client script.

## Hydrate Nova views on the browser

Hydration is the process of mounting a view component on the browser using the state used when it was rendered on the server.

In order to hydrate the views we need to load the `client.js` script on the browser.

Update the `base.html` file in the Flask app:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    ....
</head>
<body>
    ....
    {% block body %}
    {% endblock %}
    <script src="http://localhost:3000/public/client.js"></script>
</body>
</html>
```

Finally, the Nova view will be rendered on the server is interactive and dynamic on the browser.

![interactive-nova-view](/website/img/blog/interactive-nova-view.gif)


## Conclusion

Nova Proxy enables us to use modern view libraries on any web framework. So if you previously developed a web application using non-Javascript frameworks (Laravel, Flask, Ruby on Rails, etc) then Nova Proxy can help you to gradually migrate its views to a JavaScript view library (React, Vue.js) in a short period of time.
