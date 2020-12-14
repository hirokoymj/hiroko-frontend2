import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const MainListItems = (
  <>
    <ListItemLink
      to="/"
      text="Dashboard"
      icon={<DashboardIcon />}
      title="Technical References"
    />
    <ListItemLink
      to="/categoryList"
      text="Category"
      icon={<CategoryIcon />}
      title="Category"
    />
    <ListItemLink
      to="/subCategoryList"
      text="Sub Category"
      icon={<CategoryIcon />}
      title="Sub Category"
    />
    <ListItemLink
      to="/topicList"
      text="Topic"
      icon={<DescriptionIcon />}
      title="Topics"
    />
  </>
);
