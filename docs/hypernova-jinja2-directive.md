---
id: hypernova-jinja2-directive
title: Jinja2 Nova Directive
sidebar_label: Jinja2
---

[hypernova-jinja2-directive](https://github.com/ara-framework/hypernova-jinja2-directive) enables you render a Hypernova placeholder for [Nova Proxy](https://github.com/ara-framework/nova-proxy) using [Jinja2](https://github.com/pallets/jinja)


## Installation

You can install the package from pip.

```bash
pip install hypernova_jinja2_directive
```

## Setup

You need to register a global function when the Jinja2 environment is defined.
```python
from hypernova_jinja2_directive import nova

class JinjaEnvironment(Environment):
    def __init__(self,**kwargs):
        super(JinjaEnvironment, self).__init__(**kwargs)
        self.globals['nova'] = nova
```

## Setup [Flask](https://github.com/pallets/flask).

```python
from hypernova_jinja2_directive import nova

app.jinja_env.globals.update(nova=nova)
```
## Usage

You need to pass the component name and component data. The `data` is optional.

```
{{ nova('Example', {'title':'Ara Framework'}) }}
```