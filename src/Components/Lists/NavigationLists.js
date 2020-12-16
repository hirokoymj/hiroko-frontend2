import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const ReferenceListItems = () => {
  return (
    <ListItemLink
      to="/"
      text="Tech References"
      icon={<LibraryBooksOutlinedIcon />}
      title="Technical References"
    />
  );
};

export const ManagementListItems = () => {
  return (
    <>
      <ListItemLink
        to="/categoryList"
        text="Category"
        icon={<ViewAgendaOutlinedIcon />}
        title="Category"
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        icon={<AccountTreeOutlinedIcon />}
        title="Sub Category"
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
        title="Topics"
      />
    </>
  );
};
