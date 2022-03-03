import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { useFetch } from "Hooks/useFetch";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CovidChartHorizontal } from "Components/Chart/CovidChartHorizontal";
import { ICovidResponse } from "Types/api/CovidAPI";

const exclusiveStates = [
  "United States Virgin Islands",
  "Northern Mariana Islands",
  "Grand Princess Ship",
  "American Samoa",
  "Diamond Princess Ship",
  "Wuhan Repatriated",
  "Federal Prisons",
  "Navajo Nation",
];

export interface IChartMappedData {
  chartData: number[];
  chartLabels: string[];
  chartUpdated: string;
}

export const CovidChartTotalView = () => {
  const { data, loading } = useFetch<ICovidResponse[]>({
    url: "https://corona.lmao.ninja/v2/states?sort&yesterday",
    method: "get",
  });

  const mappedData = (): IChartMappedData => {
    const selectedData =
      data
        ?.map((d) => {
          return { state: d.state, cases: d.cases, updated: d.updated };
        })
        .sort((a, b) => (a.cases < b.cases ? 1 : -1)) || [];

    const filteredData = selectedData.filter((d) => {
      const isExclusiveState = exclusiveStates.find(
        (state) => state === d.state
      );
      // if (!Boolean(isExclusiveState)) {
      //   return d.state;
      // }
      return !Boolean(isExclusiveState) && d.state;
    });

    const chartLabels = filteredData.map((d) => d.state);
    const chartData = filteredData.map((d) => d.cases);
    const updated = filteredData.find((d) => d.updated)?.updated;
    const chartUpdated = moment(updated).format("MMMM DD, YYYY");

    return {
      chartLabels,
      chartData,
      chartUpdated,
    };
  };

  return (
    <DashboardLayout title="Total number of Covid-19 cases">
      {loading ? (
        <p>...loading</p>
      ) : (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <CovidChartHorizontal data={mappedData()} />
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};
