# hirokoymj.com

- URL: https://www.hirokoymj.com
- GraphQL API: https://hirokoymj-backend.herokuapp.com/
- GraphQL API repo: https://github.com/hirokoymj/hirokoymj-backend
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Cloud Server: [Heroku](https://dashboard.heroku.com/apps)

### UI Structure

- **Container**: A Container component is to make a page view. Each router calls a container component.

- **Component**: A component is a piece of UI such as a button and form that is customized by Material UI.

- **Material UI**: Material UI is the UI library to build an own designed web application faster.

- **Redux**: Redux is to provide global variables to be directly accessible from any components.

- **Apollo Client**: Enable to get data from database using GraphQL.

### Run localhost

```js
yarn dev
```

http://localhost:3000/

### APIs

**Weather API:**

- [OpenWeather](https://openweathermap.org/api)
- Current Weather Data:

```text
https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid={id}
```

- Daily Forecaset 7 days:

```text
https://api.openweathermap.org/data/2.5/forecast/daily?q=tokyo&units=metric&cnt=7&appid={id}
```

- Implemented the API in GraphQL as datasource

**Covid 19 API**

- [Postman COVID-19 API Resource Center](https://postman-toolboxes.github.io/covid-19/)
- Historical Data for all Counties in a Specified State

```text
https://corona.lmao.ninja/v2/historical/usacounties/:state?lastdays=30
```
