# hirokoymj.com

- Live URL: https://www.hirokoymj.com
- GraphQL API: https://hirokoymj-backend.herokuapp.com/
- GraphQL API repo: https://github.com/hirokoymj/hirokoymj-backend
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Deployment Server: [Heroku](https://dashboard.heroku.com/apps)

## Core packages

- React v17
- React Hooks
- Redux Toolkits - This is the newest Redux version. https://redux-toolkit.js.org/
- React Router Dom (version 5.x)
- Form - [React Hook Form](https://react-hook-form.com/)
- Form validation: [Yup](https://react-hook-form.com/get-started#SchemaValidation) (schema-based form validation).
- GraphQL APIs - Using `useQuery`, `useMutation` and `useLazyQuery` in React Apollo client.
- REST APIs - Using `useAxios` from [Axios-hooks](https://github.com/simoneb/axios-hooks).
- Material UI (version 4.x) - [UI library](https://v4.mui.com/) will helpful to build re-usuable components and also we can remove css files in React app repository.

## Ideas to be scalable an existing react app

- Create reuseable components using `children` props or passing down data in child component so that `render()` gets simple and easy to read.
- Creating **Custom Hooks** if there are many local states in a component.

```js
// Table states and filter states are separated by Custom Hooks.
export const CategoryTable = () => {
  const {
    category_loading,
    selectedFilters,
    filters,
  } = useCategoryFilterState();
```

- A Form was built with React Hook Form and a validation is used schema-based validation called `YUP`. All necessary functions for a form are defined in a custom hook so that Form component gets simple.

**CategoryForm and useCategoryForm**

```js
export const CategoryForm = () => {
const methods = useForm<ICategoryFormFields>({
  resolver: yupResolver(categoryFormSchema),
  defaultValues,
});
const { onSubmit, defaultValue } = useCategoryForm(); //
...
}
```

- When you create a new page, start using `<PageLayout></PageLayout>` in render(). The component manages some UI Redux states so the app keeps functions and design consisntent.

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
