# hirokoymj.com

- Live URL: https://www.hirokoymj.com
- GraphQL API: https://hirokoymj-backend.herokuapp.com/
- GraphQL API repo: https://github.com/hirokoymj/hirokoymj-backend
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Deployment Server: [Heroku](https://dashboard.heroku.com/apps)

## Core packages

- React v17
- React Hooks
- Redux Toolkits - This is the newest version of Redux. https://redux-toolkit.js.org/
- React Router Dom (version 5.x)
- Form - [React Hook Form](https://react-hook-form.com/)
- Form validation: [Yup](https://react-hook-form.com/get-started#SchemaValidation) (schema-based form validation).
- For GraphQL APIs - Using `useQuery`, `useMutation` and `useLazyQuery` from React Apollo client.
- For REST APIs - Using `useAxios` from [Axios-hooks](https://github.com/simoneb/axios-hooks).
- Material UI (version 4.x) - [UI library](https://v4.mui.com/) will helpful to build re-usuable components and also we can remove css files in React app repository.

## Ideas to be scalable an existing react app

- Create reuseable components using `children` props or passing down data in child component so that `render()` gets simple and easy to read.
- Creating **Custom Hooks** if there are many local states in a component.

```js
// A table states and a filter states are separated by  a custom hook.
export const CategoryTable = () => {
  const {
    category_loading,
    selectedFilters,
    filters,
  } = useCategoryFilterState();
```

- A Form needs many functions to manipulate ex. submitting data or ,loading dropdown so each form has a `FormController` in which necessary functions are defined and pass them down in a form with props

  ```js
  <CategoryFormController>
    {(props) => <CategoryForm {...props} />}
  <CategoryFormController>
  ```

- When you create a new page, start using `<PageLayout></PageLayout>` in render(). The PageLayout manages some Redux states so the page keeps consistency the functions and design.

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

http://localhost:3000/
