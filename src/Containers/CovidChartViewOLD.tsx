import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { startCase } from "lodash";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { StatesResponseData, api } from "Types/api/CovidAPI";
import { NewCasesChart, DeathsChart } from "Components/Chart/CovidChart";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CovidChartSkeleton } from "Components/Skeleton/CovidChartSkelton";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export const CovidChartView = () => {
  const [apiData, setAPIData] = useState<StatesResponseData | undefined>(
    undefined
  );
  const [countyList, setCountyList] = useState<string[]>([]);
  const [county, setCounty] = useState<string>("los angeles");
  const [state, setState] = useState<string>("california");

  const [statesList, setStatesList] = useState<string[]>([]);
  const classes = useStyles();

  const fetchCovidData = async () => {
    const us_states = await api<string[]>(
      "https://corona.lmao.ninja/v2/historical/usacounties",
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const data = await api<[StatesResponseData]>(
      `https://corona.lmao.ninja/v2/historical/usacounties/${state}?lastdays=15`,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const chartData = await data.find((d) => d.county === county);
    const counties = await data.map((d) => d.county);
    setAPIData(chartData);
    setCountyList(counties);
    setStatesList(us_states);
  };

  useEffect(() => {
    fetchCovidData();
  }, [county, state]);

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
              <FormControl className={classes.formControl}>
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
        <CovidChartSkeleton />
      )}
    </DashboardLayout>
  );
};
