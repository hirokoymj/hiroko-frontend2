## Set up a default router

- forgot to set up a default router so the current issue is when a user goes to domain/abc, the brank page is displayed.

- https://www.hirokoymj.com/test

## Convert React app to typescript

1. Installing necessary packages.

https://create-react-app.dev/docs/adding-typescript/

```js
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

<hr />

**Apollo Client**

https://www.apollographql.com/docs/react/get-started/

```js
npm install @apollo/client graphql
```

```js
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});
```

<hr />

**Redux Form**
https://www.npmjs.com/package/@types/redux-form

```js
yarn add @types/redux-form
```

<hr />

**Lodash**

https://www.npmjs.com/package/@types/lodash

```js
yarn add @types/lodash
```

**Q: How to fix the error: `Line 0: Parsing error: Cannot read property 'map' of undefined`**

**A: Installing react-scripts@^4.0.1 and above version.**

```js
yarn add react-scripts
```

References:

- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [StackOverflow: Line 0: Parsing error: Cannot read property 'map' of undefined](https://stackoverflow.com/questions/62079477/line-0-parsing-error-cannot-read-property-map-of-undefined)

```js
yarn add @types/node
```

### Redux Toolkit

https://redux.js.org/redux-toolkit/overview

```js
yarn add @reduxjs/toolkit
```

### Google Map React

https://www.npmjs.com/package/@types/google-map-react

```js
yarn add @types/google-map-react
```

### Material UI TypeScript

https://www.npmjs.com/package/@types/material-ui

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/material-ui)

```js
yarn add @types/material-ui
```
