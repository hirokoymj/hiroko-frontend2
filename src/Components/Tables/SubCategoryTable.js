import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import { SUB_CATEGORIES } from "Queries/SubCategory";
import { Table } from "Components/Tables/Table";

const useStyles = makeStyles((theme) => ({
  actionIcons: {
    marginRight: theme.spacing(2),
  },
}));

export const SubCategoryTable = ({ openDialog }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(SUB_CATEGORIES);
  let subCategories = get(data, "subCategories", []);
  if (!loading) {
    subCategories.sort((a, b) => a.category.order - b.category.order);
  }

  const mappedData = map(subCategories, (subCategory) => {
    const { id, name, order, category } = subCategory;
    const categoryId = get(category, "id", "");
    const categoryName = get(category, "name", "");
    const categoryOrder = get(category, "order", 0);
    const actions = (
      <>
        <Link
          component={RouterLink}
          to={{
            pathname: `/editSubCategory/${id}`,
            state: { title: "Edit Sub Category" },
          }}
        >
          <EditIcon className={classes.actionIcons} color="secondary" />
        </Link>
        <Link href="#" onClick={(e) => openDialog(e, id)}>
          <DeleteIcon className={classes.actionIcons} color="secondary" />
        </Link>
      </>
    );
    return {
      id,
      name,
      order,
      categoryId,
      categoryName,
      categoryOrder,
      actions,
    };
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Table
          data={mappedData}
          colmuns={[
            {
              label: "Category",
              field: "categoryName",
            },
            {
              label: "Sub Category",
              field: "name",
            },
            {
              label: "Display order",
              field: "order",
            },
            {
              label: "Actions",
              field: "actions",
              align: "center",
            },
          ]}
        />
      )}
    </div>
  );
};
