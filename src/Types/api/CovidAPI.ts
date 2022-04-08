export interface NewCasesByState {
  province: string;
  county: string;
  timeline: {
    cases: {
      [key: string]: number;
    };
    deaths: {
      [key: string]: number;
    };
  };
}

export interface TotalCasesbyState {
  state: string;
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
}

export interface IChartData {
  chartData: number[];
  chartLabels: string[];
  chartLabel: string;
  selectedCounty: string;
}
