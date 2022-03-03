export type StatesResponseData = {
  province: string;
  county: string;
  timeline: {
    cases: {};
    deaths: {};
  };
};

export type ICovidResponse = {
  active: number;
  cases: number;
  casesPerOneMillion: number;
  deaths: number;
  deathsPerOneMillion: number;
  population: number;
  recovered: number;
  state: string;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  updated: number;
};
