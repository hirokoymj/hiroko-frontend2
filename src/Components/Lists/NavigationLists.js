import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const ReferenceListItems = ({ setDrawerClosed }) => {
  return (
    <ListItemLink
      to="/"
      text="Tech References"
      icon={<LibraryBooksOutlinedIcon />}
      title="Technical References"
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};

export const ManagementListItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/categoryList"
        text="Category"
        icon={<ViewAgendaOutlinedIcon />}
        title="Category"
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        icon={<AccountTreeOutlinedIcon />}
        title="Sub Category"
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
        title="Topics"
        onClick={setDrawerClosed && setDrawerClosed}
      />
    </>
  );
};

export const WeatherListItems = ({ setDrawerClosed }) => {
  return (
    <ListItemLink
      to="/forecast"
      text="Weather Forecast"
      icon={<WbSunnyOutlinedIcon />}
      title="7 days Weather Forecast"
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};
