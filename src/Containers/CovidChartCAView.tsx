import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { startCase } from "lodash";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import get from "lodash/get";

import { StatesResponseData } from "Types/api/CovidAPI";
import { NewCasesChart, DeathsChart } from "Components/Chart/CovidChart";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CovidChartSkeleton } from "Components/Skeleton/CovidChartSkelton";
import { useFetch } from "Hooks/useFetch";
import { calculateDiff } from "./utils";

export interface IChartMappedData {
  chartData: number[];
  chartLabels: string[];
  chartLabel: string;
  selectedCounty: string;
}

export const CovidChartCAView = () => {
  const [county, setCounty] = useState<string>("los angeles");
  const { data, loading } = useFetch<[StatesResponseData]>({
    url: `https://corona.lmao.ninja/v2/historical/usacounties/california?lastdays=15`,
    method: "get",
  });

  const counties = !loading ? data?.map((d) => d.county) : [];

  const mappedNewCasesData = (): IChartMappedData => {
    // chart data
    const selectedData = data?.find((d) => d.county === county) || [];
    const cases = get(selectedData, "timeline.cases", {});
    const values = Object.keys(cases).map((key) => cases[key]);
    const chartData = calculateDiff(values);

    // labels
    const labels = Object.keys(cases);
    labels.shift();

    const chartLabel = `New Cases in ${startCase(county)}`;
    const selectedCounty = startCase(county);

    return {
      chartLabels: labels,
      chartData: chartData,
      chartLabel,
      selectedCounty,
    };
  };

  const mappedDeathsData = (): IChartMappedData => {
    // chart data
    const selectedData = data?.find((d) => d.county === county) || [];
    const deaths = get(selectedData, "timeline.deaths", {});
    const values = Object.keys(deaths).map((key) => deaths[key]);
    const chartData = calculateDiff(values);

    // labels
    const labels = Object.keys(deaths);
    labels.shift();

    const chartLabel = `New Deaths in ${startCase(county)}`;
    const selectedCounty = startCase(county);

    return {
      chartLabels: labels,
      chartData: chartData,
      chartLabel,
      selectedCounty,
    };
  };

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    const newVal = e.target.value as string;
    setCounty(newVal);
  };

  return (
    <DashboardLayout title="Covid-19 visualizations: California">
      {loading ? (
        <CovidChartSkeleton />
      ) : (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="caption">States</Typography>
              <Typography variant="h5">California</Typography>
              <FormControl>
                <InputLabel id="county">county</InputLabel>
                <Select name="county" onChange={handleChange} value={county}>
                  {counties?.map((county) => (
                    <MenuItem value={county} key={county}>
                      {startCase(county)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid container spacing={2} justify="center">
            <Grid item xs={12} md={6}>
              <Paper>
                <Typography variant="h6">New Cases:</Typography>
                <NewCasesChart data={mappedNewCasesData()} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <Typography variant="h6">Deaths:</Typography>
                <DeathsChart data={mappedDeathsData()} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};
