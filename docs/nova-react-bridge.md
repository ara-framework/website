---
id: nova-react-bridge
title: Nova React Bridge
sidebar_label: React
---

## Install

```shell
npm install nova-react-bridge
```

## Usage

The `Nova` component requires the props `name` and `data`

- `name` is the registered Nova View.
- `data` is the data necessary to render the view.

```jsx
import { Nova } from 'nova-react-bridge'

const Page = () => (
  <div>
    <Nova 
      name="NavBar"
      data={{ brand: 'Ara Framework', links: [{ url: 'https://github.com/ara-framework', text: "Github" }]}}
    />
  </div>
)
```