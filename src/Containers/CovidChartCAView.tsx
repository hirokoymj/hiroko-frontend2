import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { startCase } from "lodash";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { StatesResponseData } from "Types/api/CovidAPI";
import { NewCasesChart, DeathsChart } from "Components/Chart/CovidChart";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CovidChartSkeleton } from "Components/Skeleton/CovidChartSkelton";
import { useFetch } from "Hooks/useFetch";

export const CovidChartCAView = () => {
  const [county, setCounty] = useState<string>("los angeles");
  const { data, loading } = useFetch<[StatesResponseData]>({
    url: `https://corona.lmao.ninja/v2/historical/usacounties/california?lastdays=15`,
    method: "get",
  });

  const chartData = !loading
    ? data?.find((d) => d.county === county)
    : undefined;
  const counties = !loading ? data?.map((d) => d.county) : [];

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    const newVal = e.target.value as string;
    setCounty(newVal);
  };

  return (
    <DashboardLayout title="Covid-19 Visualizations">
      {!loading ? (
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
                <NewCasesChart data={chartData} county={startCase(county)} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <Typography variant="h6">Deaths:</Typography>
                <DeathsChart data={chartData} county={startCase(county)} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CovidChartSkeleton />
      )}
    </DashboardLayout>
  );
};
