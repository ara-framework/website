---
id: nova-proxy
title: Nova Proxy
sidebar_label: Nova Proxy
---

[Nova Proxy](https://github.com/ara-framework/nova-proxy) is a proxy server to serve-side include Nova views regardless the technology used on the host application such as Wordpress, Nuxt.js, Laravel and so on.

## How Nova Proxy works?

![Nova Proxy Diagram](/website/img/nova-proxy.png)

1. A user requests a page to **Nova Proxy**.

2. **Nova Proxy** passes the request to the host application.

3. The host applications renders the placeholders where the Nova views should be displayed inside the page using the **Nova Directive**.

4. The host application sends back the HTML generated to **Nova Proxy**.

5. **Nova Proxy** parses the HTML to gather all the information necessary to request the Nova views.

6. **Nova Proxy** makes a batch request to the **Nova Service** to get all the Nova views.

7. The **Nova Service** server-side render the views using the Hypernova Bindings ([React](/website/docs/nova-react), [Vue.js](/website/docs/nova-vue), [Angular](/website/docs/nova-angular), [Svelte](/website/docs/nova-svelte), [Preact](http://localhost:3000/website/docs/nova-preact))

8. The **Nova Service** send back the rendered views to **Nova Proxy**.

9. **Nova Proxy** replaces the placeholders with the HTML of the successful results and keeps the placeholders for the failed ones in order to enable the client-side scripts to renderer the views in the browser as a fallback.

10. **Nova Proxy** sends back the page to the user.

11. On the browser, JavaScript is used to progressively enhance the application and make it dynamic.

## Server-Side Include using Nova Proxy

In order to include a Nova view inside a page we need to render a placeholder.

```html
<div data-hypernova-key="Example" data-hypernova-id="f07ac8b3-9256-49db-90b9-fb30789a8f85"></div>
<script type="application/json" data-hypernova-key="Example" data-hypernova-id="f07ac8b3-9256-49db-90b9-fb30789a8f85">
    <!--{"title":"Ara Framework"}-->
</script>
```

Check how to use it on the [Quick Start](http://localhost:3000/website/docs/quick-start) page.