---
id: hypernova-handlebars-directive
title: Handlebars Nova Directive
sidebar_label: Handlebars
---

[hypernova-handlebars-directive](https://github.com/ara-framework/hypernova-handlebars-directive) enables you to render a Hypernova placeholder for [Nova Proxy](https://github.com/ara-framework/nova-proxy) using [Handlerbars Partials](https://handlebarsjs.com/#partials).

## Installation

Install the NPM package. 

```bash
npm i --save hypernova-handlebars-directive
```

## Setup

You need to register the partial first using the helper function provided.
```js
const hbs = require('hbs');
const directive = require('hypernova-handlebars-directive');

directive(hbs)
```

## Usage

You need to provide a `name` attribute in the expression at least. Also, you can provide the data passing a variable on the `data` attribute or using an attribute with the following convention `data-<key>` to set an individual value.

```
{{>nova name="Navbar" data=data data-brand="Ara Framework" }}
```

## Tutorial

Take a look in the section: [Render views on page](https://ara-framework.github.io/website/docs/render-on-page)