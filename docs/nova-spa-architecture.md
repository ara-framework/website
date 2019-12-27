---
id: nova-spa-architecture
title: The Nova architecture (Client-Side Rendering)
sidebar_label: Nova architecture (Client-Side Rendering)
---

The client-side implementation consists of a host application (SPA) that contains references to the javascript bundles of each Micro-frontend.

Those bundles are lazy-loaded depends on the client-side route or when a Micro-frontend needs to be mounted on the page.

![client side integration](/website/img/nova-spa.png)

The host application use a [Nova Bridge](/website/docs/nova-bridge) to render a placeholder on the page where the Nova (Micro-Frontend) view needs to be mounted, then it emits an event named `NovaMount` the Nova entry-point listens and uses to render and mount the view.

![client side integration](/website/img/client-side-integration.png)

## Examples

- [Vue.js](https://github.com/marconi1992/ara-spa-vue)
- [React](https://github.com/marconi1992/ara-spa-react)