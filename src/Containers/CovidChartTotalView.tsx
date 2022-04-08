import Grid from "@material-ui/core/Grid";
import moment from "moment";
import useAxios from "axios-hooks";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CovidChartHorizontal } from "Components/Chart/CovidChartHorizontal";
import { TotalCasesbyState } from "Types/api/CovidAPI";

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
  const [{ data, loading, error }] = useAxios<TotalCasesbyState[]>({
    url: "/v2/states?sort&yesterday",
    method: "GET",
  });

  const mappedData = (): IChartMappedData => {
    const selectedData =
      data
        ?.map(({ state, cases, updated }) => {
          return { state, cases, updated };
        })
        .sort((a, b) => (a.cases < b.cases ? 1 : -1)) || [];

    const filteredData = selectedData.filter((d) => {
      const isExclusiveState = exclusiveStates.find(
        (state) => state === d.state
      );
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

  if (error) return <p>Error!</p>;
  return (
    <DashboardLayout title="Total number of COVID-19 cases by the U.S. states">
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
