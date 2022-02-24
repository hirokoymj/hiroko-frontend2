import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import { startCase } from "lodash";

import { StatesResponseData } from "Types/api/CovidAPI";
import { useFetch } from "Hooks/useFetch";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { NewCasesChart, DeathsChart } from "Components/Chart/CovidChart";

interface IFormValue {
  us_state: string;
  us_county: string;
}

export const CovidChartSearchView = () => {
  const [formValues, setFormValues] = useState<IFormValue>({
    us_state: "hawaii",
    us_county: "honolulu",
  });

  const { data: usStatesData, loading: usStatesLoading } = useFetch<string[]>({
    url: "https://corona.lmao.ninja/v2/historical/usacounties",
    method: "get",
  });
  const {
    data: usCountyData,
    loading: usCountyLoading,
    refetch,
  } = useFetch<[StatesResponseData]>({
    url: `https://corona.lmao.ninja/v2/historical/usacounties/${formValues.us_state}?lastdays=15`,
    method: "get",
  });

  useEffect(() => {
    refetch();
  }, [formValues.us_state]);

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    // const newVal = e.target.value as string;
    const newVal = e.target.value as string;
    const name = e.target.name as string;
    setFormValues({ ...formValues, [name]: newVal });
  };

  const counties = !usStatesLoading ? usCountyData?.map((d) => d.county) : [];
  const chartData = !usCountyLoading
    ? usCountyData?.find((d) => d.county === formValues.us_county)
    : undefined;

  return (
    <DashboardLayout title="Covid-19 Visualizations">
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={6}>
          <Paper>
            <FormControl>
              <InputLabel id="us_state">US States</InputLabel>
              <Select
                name="us_state"
                onChange={handleChange}
                value={formValues.us_state}
                disabled={usStatesLoading}>
                {usStatesData?.map((state) => (
                  <MenuItem value={state} key={state}>
                    {startCase(state)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="us_county">County</InputLabel>
              <Select
                name="us_county"
                onChange={handleChange}
                value={formValues.us_county}
                disabled={usCountyLoading}>
                {counties?.map((item: any) => (
                  <MenuItem value={item} key={item}>
                    {startCase(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
      {usCountyLoading || usStatesLoading ? (
        <p>...loading</p>
      ) : (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography component="h2" variant="h5" gutterBottom>
              {`${startCase(formValues.us_state)}, ${startCase(
                formValues.us_county
              )}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6">New Cases:</Typography>
              <NewCasesChart
                data={chartData}
                county={startCase(formValues.us_county)}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6">Deaths:</Typography>
              <DeathsChart
                data={chartData}
                county={startCase(formValues.us_county)}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};
