import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import { TOPICS } from "Queries/Topic";
import { Table } from "Components/Tables/Table";

const useStyles = makeStyles((theme) => ({
  actionIcons: {
    marginRight: theme.spacing(2),
  },
}));

export const TopicTable = ({ openDialog }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(TOPICS);
  const topics = !loading && get(data, "topics", []);

  const mappedData = map(
    topics,
    ({ id, title, url, category, subCategory }) => {
      const categoryName = get(category, "name", "");
      const subCategoryName = get(subCategory, "name", "");

      const titleLink = (
        <Link href={url} variant="body2" target="_blank" rel="noreferrer">
          {title}
        </Link>
      );

      const actions = (
        <>
          <Link
            component={RouterLink}
            to={{
              pathname: `/editTopic/${id}`,
              state: { title: "Edit Topic" },
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
        titleLink,
        url,
        categoryName,
        subCategoryName,
        actions,
      };
    }
  );

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
              field: "subCategoryName",
            },
            {
              label: "Title",
              field: "titleLink",
            },
            {
              label: "Actions",
              field: "actions",
              align: "right",
            },
          ]}
        />
      )}
    </div>
  );
};
