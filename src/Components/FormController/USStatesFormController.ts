import React, { useState, useEffect } from "react";
import { destroy } from "redux-form";
import { StatesResponseData, api } from "Types/api/CovidAPI";
import { startCase } from "lodash";
import { IFormSelectOptions } from "Types/forms";

export const USStatesFormController = ({ children }: { children: any }) => {
  const [usStatesList, setUSStatesList] = useState<IFormSelectOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [countyloading, setCountyLoading] = useState<boolean>(false);
  const [countyList, setCountyList] = useState<IFormSelectOptions[]>([]);
  const [county, setCounty] = useState<string>("los angeles");

  const fetchUSStates = async () => {
    console.log("fetchUSStates");
    setLoading(true);
    const usStates = await api<string[]>(
      "https://corona.lmao.ninja/v2/historical/usacounties",
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const result = await usStates.map((us_state) => {
      return {
        label: startCase(us_state),
        value: us_state,
      };
    });

    setUSStatesList(result);
    setLoading(false);
  };

  const handleSelectChange = async (state: string) => {
    setCountyLoading(true);
    // const data = await api<[StatesResponseData]>(
    //   `https://corona.lmao.ninja/v2/historical/usacounties/${state}?lastdays=15`,
    //   {
    //     method: "GET",
    //     redirect: "follow",
    //   }
    // );
    // const result = await data.map((d) => {
    //   const county = d.county;
    //   return {
    //     label: county,
    //     value: county,
    //   };
    // });
    // setCountyList(result);
    // setCountyLoading(false);
  };

  useEffect(() => {
    fetchUSStates();
  }, []);

  return children({
    usStatesList,
    loading,
    countyloading,
    handleSelectChange,
  });
};
