# Storycap Lazy Wait

> Helper function to ensure story images have loaded before capturing the story

When storycap captures a story it doesn't know if there is any lazy loading functionality in your application. Luckily storycap provides a `waitFor` option which can return a promise. The screenshot will not be taken until this promise resolves. This module provides this as a helper functon. It's built with `vue-lazyload` in mind, but can be expanded to be more configurable in future if required.

## Installation

```bash
$ yarn add @netsells/storycap-lazy-wait
```

## Usage

Register the storycap addon in your storybook config as outlined in the docs. Then pull in this module and return it in the storybook parameters `waitFor` option:

```js
import lazyWait from '@netsells/storycap-lazy-wait';

addParameters({
    screenshot: {
        waitFor() {
            return lazyWait();
        },
    },
});
```

If you already have logic in this method you can return a `Promise.all`:

```js
addParameters({
    screenshot: {
        waitFor() {
            const myWaitFunctionality = new Promise((resolve) => {
                // ...logic
            })

            return Promise.all([
                myWaitFunctionality,
                lazyWait(),
            ]);
        },
    },
});
```