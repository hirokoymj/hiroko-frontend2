import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { startCase } from "lodash";
import Paper from "@material-ui/core/Paper";

import { StatesResponseData } from "Types/api/CovidAPI";
import { useFetch } from "Hooks/useFetch";

export const CovidChartViewNew = () => {
  // const [us_state, setUSState] = useState<string>("");
  // const [us_county, setUSCounty] = useState<string>("");
  const [formValues, setFormValues] = useState({
    us_state: "",
    us_county: "",
  });
  const [usCountyList, setUSCountyList] = useState<any>();

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

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    const newVal = e.target.value as string;
    const name = e.target.name as string;
    setFormValues({ ...formValues, [name]: newVal });
  };

  const handleStateChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    handleChange(e);
    console.log(formValues);
    refetch();
    const counties = usCountyData?.map((d) => d.county);
    setUSCountyList(counties);
  };

  // const handleCountyChange = (
  //   e: React.ChangeEvent<{ value: unknown; name?: string }>
  // ) => {
  //   const newVal = e.target.value as string;
  //   console.log(newVal);
  //   setUSCounty(newVal);
  // };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Paper>
          <h1>US States</h1>
          {usStatesLoading ? (
            <p>...loading!</p>
          ) : (
            <div>
              <FormControl style={{ width: "50%" }}>
                <InputLabel id="us_state">US States</InputLabel>
                <Select
                  name="us_state"
                  onChange={handleStateChange}
                  value={formValues.us_state}>
                  {usStatesData?.map((state) => (
                    <MenuItem value={state} key={state}>
                      {startCase(state)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {usCountyLoading ? (
                <p>...loading</p>
              ) : (
                <FormControl style={{ width: "50%" }}>
                  <InputLabel id="us_county">County</InputLabel>
                  <Select
                    name="us_county"
                    onChange={handleChange}
                    value={formValues.us_county}>
                    {usCountyList?.map((item: any) => (
                      <MenuItem value={item} key={item}>
                        {startCase(item)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
