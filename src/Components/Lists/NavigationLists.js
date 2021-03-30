import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

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

export const PhotoGalleryItems = ({ setDrawerClosed }) => {
  return (
    <ListItemLink
      to="/photoLA"
      text="Photos in Los Angeles"
      icon={<PhotoCameraOutlinedIcon />}
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};
