---
title: Universal Rendering in Laravel using Vue.js and Ara Framework
author: Felipe Guizar Diaz
authorURL: https://twitter.com/felipeguizard
authorImageURL: https://www.gravatar.com/avatar/5c0f68aec4986617a543a5699032075e
authorTwitter: felipeguizard
---

![Laravel + Vue.js](/website/img/blog/laravel-vue.png)

Universal Rendering consists in rendering pages on the server and making them interactive on the browser using the same view components built with a library such as React, Vue.js, Angular, etc. 

Nowadays, JavaScript frameworks such as [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/) and [NgUniversal](https://github.com/angular/universal) make this duty easier. However, how can we achieve it on non JavaScript frameworks like Laravel?

<!--truncate-->

## Setup Laravel

Download Laravel installer using Composer.

```shell
composer global require laravel/installer
```

Create a folder named `ara-laravel` and run the following command inside the folder to create a Laravel project.

```shell
composer create-project --prefer-dist laravel/laravel laravel-site
```

Once the project is created run the Laravel application on http://localhost:8000/.

```shell
php artisan serve
```

Browser:

![Laravel main page](/website/img/blog/laravel-main-page.png)

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
yarn dev
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

## Setup Nova Directive in Laravel Blade

Install Nova Direcitive for Laravel Blade using Composer inside the `laravel-site` folder.

```shell
composer require marconi1992/hypernova-blade-directive
```

Add `NovaServiceProvider` in application config `config/app.php`

```php

return [
    ...
    'providers': [
        ...
        Illuminate\View\ViewServiceProvider::class,
        /*
         * Package Service Providers...
         */
        Marconi\Nova\NovaServiceProvider::class,
        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        ...
    ]
    ...
]

```

## Use Nova Directive in a Laravel view

Add the `Example` view in welcome page.

`resources/views/welcome.blade.php`

```html
<html>
    ...
    <body>
        ...
        <div class="content">
            <div class="title m-b-md">
                Laravel
            </div>
            <!-- Nova Directive starts -->
            @hypernova('Example', [ 'title' => 'Ara Framework'])
            <!-- Nova Directive ends -->
            <div class="links">
                <a href="https://laravel.com/docs">Docs</a>
                <a href="https://laracasts.com">Laracasts</a>
                <a href="https://laravel-news.com">News</a>
                <a href="https://blog.laravel.com">Blog</a>
                <a href="https://nova.laravel.com">Nova</a>
                <a href="https://forge.laravel.com">Forge</a>
                <a href="https://github.com/laravel/laravel">GitHub</a>
            </div>
        </div>
        ...
    </body>
</html>
```

## Server-side rendering

The Nova View is not rendered yet, we need to implement [Nova Proxy](https://github.com/ara-framework/nova-proxy) in order to server-side render and include the Nova views.

The Nova Direvitve renders a placeholder that contains the necessary information to enable Nova Proxy communicate with the Nova service and include the Nova view.

```html
<div data-hypernova-key="Example" data-hypernova-id="d198fa6c-c9ec-11e9-a223-8c85903a4c93"></div>
<script type="application/json" data-hypernova-key="Example" data-hypernova-id="d198fa6c-c9ec-11e9-a223-8c85903a4c93"><!--{"title":"Ara Framework"}--></script>
```

### Nova Proxy

Nova proxy is a service to implement Unversal Rendering with any view library (React, Vue.js, etc) on any web platform (Laravel, Flask, etc). For example, in this demo we'll render a view using Vue.js into a web application built with Laravel.

How it works:

![](https://cdn-images-1.medium.com/max/2400/1*0_KCs-IFVCIN8J5RwP7uFg.png)
1. A user requests a page to the **Nova Proxy**.

2. The **Nova Proxy** passes the request to the website server.

3. The website uses a **Nova Directive** to render the placeholders where the Nova views should be included.

4. The website sends back the HTML generated to the **Nova Proxy**.

5. The **Nova Proxy** include the Nova views on the placeholders and sends back the HTML to the browser.

Finally, on the browser, JavaScript is used to progressively enhance the application and make it interactive. Read more [here](/website/docs/nova-architecture) about the Nova Architecture.

### Setup Nova Proxy

Create a configuration file for Nova Proxy in the root folder:

```
touch nova-proxy.json
```

Add the following configuration in `nova-proxy.json` file to proxy the incoming requests to the Laravel web server.

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

Now, see how the Nova view is displayed, it's because Nova Proxy include the Nova view in the page coming from the Laravel application.

Browser:

![Nova view rendered by Nova Proxy](/website/img/blog/laravel-ssr-nova-view.png)

## Client-side rendering

The `Example` view is rendering only a simple heading. We can make it interactive adding an input element that changes the heading text.

Replace the `nova/src/components/Example.vue` with the following code:

```vue
<template>
  <div>
    <h2>{{title}}</h2>
    <div>
      <input type="text" v-model="title">
    </div>
    <br/>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
```

Now, the Nova view displays an input element but the heading text doesn't change when we type something. It's because we need to add the client-side script.

## Hydrate Nova views on the browser

Hydration is the process of mounting a view component on the browser using the state used when it was rendered on the server.

In order to hydrate the views we need to load the `client.js` script on the browser.

Update the `welcome.blade.php` file in the Laravel application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    ....
</head>
<body>
    ....
    <script src="http://localhost:3000/public/client.js"></script>
</body>
</html>
```

![Nova view interactive](/website/img/blog/laravel-interactive-view.gif)

## Conclusion

Nova Proxy enables us to use modern view libraries on any web framework. So if you previously developed a web application using non Javascript frameworks (Laravel, Flask, Ruby on Rails, etc) then Nova Proxy can help you to gradually migrate its views to a JavaScript view library (React, Vue.js) in a short period of time.