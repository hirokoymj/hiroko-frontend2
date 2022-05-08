# hirokoymj.com

- Live Frontend URL: https://www.hirokoymj.com
- Live GraphQL API: https://hirokoymj-backend.herokuapp.com/
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Deployment Server: [Heroku](https://dashboard.heroku.com/apps)

## Core packages

- React (version 17.x)
- React Hooks
- Redux
- React Router (version 5.x)
- Form - [React Hook Form](https://react-hook-form.com/)
- Form validation: [Yup](https://react-hook-form.com/get-started#SchemaValidation)
- GraphQL: [Apollo Client](https://www.apollographql.com/docs/react)
- REST API - [Axios-hooks](https://github.com/simoneb/axios-hooks).
- UI library: [Material UI vesion 4](https://v4.mui.com/)

## Architecture and coding rules

**Trying to get render function clean and simple**

- Created reuable components with `children` props in React. Button, Dialog and Link are the reusable components and they are used globally in the site.

- Form was built with **React Hook Form** and schema-based form validation called **yup**. I used to use Redux-Form a lot in the site but won't be use any more. React Hook Form is better than Redux-Form because it is simple to use and provides a good documentation.

- Each Form has a Custom Hook function where all necessary form logic such as `onSubmit` is defined. Form usually gets complecated when connecting to back-end API. With Custom Hook, we can separate Form logic from Form UI.

```text
`CategoryForm` contains UI only.
`useCategoryForm` hook contains a form logic.
```

**Page Wrapper component**

- Every view page stars with Page Wrappter component called `<PageLayout></PageLayout>`. This makes all view pages keep consisntency functionally and visually.

## APIs

hirokoymj.com is used two external APIs - Weather API and Covid 19 API. I used OpenWeatherMap API in the previous company and it is one of my comfortable apis. For Covid 19 API, I recently added it in my site to show a data visualization and also get to know the daily US covid-19 situation.

**Weather API:**

- [OpenWeather](https://openweathermap.org/api)

  ```text
  https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid={id}
  ```

- Implemented the API in GraphQL as datasource

**Covid 19 API**

- [Postman COVID-19 API Resource Center](https://postman-toolboxes.github.io/covid-19/)

  ```text
  https://corona.lmao.ninja/v2/historical/usacounties/:state?lastdays=30
  ```

## Run localhost

```js
yarn dev
```

- Open your browser and check below URL.
  http://localhost:3000/

## Deploy with Heroku

- https://devcenter.heroku.com/articles/upgrading-to-the-latest-stack
- https://stackoverflow.com/questions/31527442/fatal-failed-to-read-object-objectid-interrupted-system-call

```js
% git push heroku master --quiet
```
