<h1>hirokoymj.com</h1>

## URL

https://www.hirokoymj.com

## Back-end

**Apollo Server**

https://hirokoymj-backend.herokuapp.com/

**Back-end repository**

https://github.com/hirokoymj/hirokoymj-backend

## Database

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Cloud Server

[Heroku](https://dashboard.heroku.com/apps)

## Technologies

**Front-end**

- React, Redux, Redux-Form, React-Router, Apollo Client, Lodash, Moment.js, Google Map API, OpenWeatherMap API, Express.js(Live Server), Enfoced HTTPS

**Back-end**

- Apollo Server, GraphQL, MongoDB, Mongoose, REST API, dotEnv

## localhost

```js
yarn dev
```

http://localhost:3000/

## Screenshot - desktop

![](src/Assets/hirokoymj-com-desktop.png)

## Screenshot - mobile

![](src/Assets/hirokoymj-com-mobile.png)

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

### Creating tsconfig.json
