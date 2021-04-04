import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const TechNavItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/tech"
        text="Tech References"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/categoryList"
        text="Category"
        icon={<ViewAgendaOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        icon={<AccountTreeOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
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
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};

export const ResumeListItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/Resume_HirokoYamaji_JP.pdf"
        text="Resume (日本語)"
        icon={<PictureAsPdfOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/Resume_HirokoYamaji_EN.pdf"
        text="Resume (English)"
        icon={<PictureAsPdfOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
    </>
  );
};
