---
id: nova-architecture
title: The Nova architecture
sidebar_label: Nova architecture
---

Nova came up as a base architecture to integrate Micro-frontends in any existing web framework regardless of what programming language it's built atop.

![Nova Architecture Diagram](https://cdn-images-1.medium.com/max/2400/1*43CBDwIZ8P2q_ZfGg_ktUQ.png)

The Architecture consists mainly of four components:
* **Nova Bindings:** These bindings enable [Hypernova](https://github.com/airbnb/hypernova) to render JavaScript views using any library for building UI interfaces such as [React](https://reactjs.org/), [Vue.js](https://vuejs.org/), [Angular](https://angular.io/), [Svelte](https://svelte.dev/), [Preact](https://preactjs.com/), and [Hyperapp](https://github.com/jorgebucaran/hyperapp).

* **Nova Directive:** A directive renders a placeholder with necessary data for enabling **Nova Proxy** to request the Micro-frontend view and letting know in which part of the page should be displayed. It's the key component to integrate Micro-frontends in any web framework.

* **Nova Proxy and Middleware:** It’s a proxy server for server-side include(SSI) Micro-frontends using transclusion. Nova Middleware parses the HTML generated for the **Nova Directive** in order to request the Micro-frontend views to **Nova Cluster** and include them inside the page.

* **Nova Cluster:** It’s a Micro-frontends aggregator to enable consumers to ask for the views they want without know which Micro-frontend is responsible to render them.

## How The Nova Architecture Works
![](https://cdn-images-1.medium.com/max/2400/1*0_KCs-IFVCIN8J5RwP7uFg.png)
1. A user requests a page to **Nova Proxy**.

2. **Nova Proxy** passes the request to the website server.

3. The website renders the placeholders where the Micro-frontends views should be displayed inside the page using the **Nova Directive**.

4. The website sends back the HTML generated to **Nova Proxy**.

5. **Nova Proxy** parses the HTML to gather all the information necessary to request the Micro-frontend views.

![](https://cdn-images-1.medium.com/max/1600/1*ZuVSjQj8b7kFx1Z9MrvHEQ.png) <!-- .element height="50%" width="50%" -->

6. **Nova Proxy** makes a batch request to the **Nova Cluster** to get all the Micro-frontend views.

7. **Nova Cluster** creates a batch request for each involved Micro-frontend.

8. **Nova Cluster** makes a batch request to each Micro-frontend in parallel.

![](https://cdn-images-1.medium.com/max/2000/1*Pk_gQwR1fX4GeYrcGu6TFA.png)

9. The Micro-frontends can gather all the necessary data to render the views from an external data source like a Rest API or GraphQL.

10. The Micro-frontends server-side render the views using the **Hypernova Bindings** based on the gathered data or using the one provided by the **Nova Cluster**.

11. The Micro-frontends send back the rendered views to **Nova Cluster**.

![](https://cdn-images-1.medium.com/max/1600/1*-OVyjBSDVBXIBBWqjjhoFA.png)

12. **Nova Cluster** aggregates the Micro-frontends responses and sends them back to **Nova Proxy**.

13. **Nova Proxy** replaces the placeholders with the HTML of the successful results and keeps the placeholders for the failed ones in order to enable the client-side scripts renderer the views in the browser as a fallback.

14. **Nova Proxy** sends back the page to the user.

15. On the browser, JavaScript is used to progressively enhance the application and make it dynamic.