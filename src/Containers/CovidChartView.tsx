import React, { useEffect, useState } from "react";
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

export const CovidChartView = () => {
  const [apiData, setAPIData] = useState<StatesResponseData | undefined>(
    undefined
  );
  const [countyList, setCountyList] = useState<string[]>([]);
  const [county, setCounty] = useState<string>("los angeles");

  const fetchCovidData = async () => {
    fetch(
      "https://corona.lmao.ninja/v2/historical/usacounties/california?lastdays=15"
    )
      .then((response) => response.json())
      .then((data) => {
        const chartData = data.find(
          (d: StatesResponseData) => d.county === county
        );
        setAPIData(chartData);
        const counties = data.map((d: StatesResponseData) => d.county);
        setCountyList(counties);
      });
  };

  useEffect(() => {
    fetchCovidData();
  }, [county]);

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    const newVal = e.target.value as string;
    setCounty(newVal);
  };

  return (
    <DashboardLayout fullWidth={true} title="Covid-19 Statistics">
      {apiData ? (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h5">California</Typography>
              <FormControl style={{ width: "50%" }}>
                <InputLabel id="county">county</InputLabel>
                <Select name="county" onChange={handleChange} value={county}>
                  {countyList.map((county) => (
                    <MenuItem value={county} key={county}>
                      {startCase(county)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6">New Cases:</Typography>
              <NewCasesChart data={apiData} county={startCase(county)} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6">Deaths:</Typography>
              <DeathsChart data={apiData} county={startCase(county)} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <div>loading...</div>
      )}
    </DashboardLayout>
  );
};
