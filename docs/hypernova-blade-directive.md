---
id: hypernova-blade-directive
title: Laravel Blade Nova Directive
sidebar_label: Laravel Blade
---

## Setup
Install Nova Directive for Laravel Blade using Composer inside the project folder.

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

Add the `Example` view on the welcome page.

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
        </div>
        ...
    </body>
</html>
```

## Tutorial

Take a look in the  next post: [Universal Rendering in Laravel using Vue.js and Ara Framework](/website/blog/2019/08/28/universal-rendering-in-laravel)