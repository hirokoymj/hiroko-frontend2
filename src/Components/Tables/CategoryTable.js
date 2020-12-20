import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import moment from "moment";

import { CATEGORIES } from "Queries/Category";
import { Table } from "Components/Tables/Table";
import { Title } from "Components/Titles/Title";

const useStyles = makeStyles((theme) => ({
  actionIcons: {
    marginRight: theme.spacing(2),
  },
}));

const useLoadMore = (loading, error, fetchMore, pageInfo) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { hasNextPage, endCursor } = pageInfo;
  const limit = 5;

  const fetchMoreData = () => {
    if (!loading && !error) {
      if (hasNextPage) {
        setIsLoadingMore(true);
        fetchMore({
          variables: { cursor: endCursor, limit },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.categories.categoryFeed = [
              ...prevResult.categories.categoryFeed,
              ...fetchMoreResult.categories.categoryFeed,
            ];
            return fetchMoreResult;
          },
        });
        setIsLoadingMore(false);
      }
    }
  };

  return { fetchMoreData, isLoadingMore, hasNextPage };
};

export const CategoryTable = ({ openDialog }) => {
  const classes = useStyles();
  const { data, loading, error, fetchMore } = useQuery(CATEGORIES, {
    variables: {
      cursor: null,
      limit: 5,
    },
  });
  const categories = !loading && get(data, "categories.categoryFeed", []);
  const pageInfo = !loading && get(data, "categories.pageInfo", {});
  const { isLoadingMore, fetchMoreData, hasNextPage } = useLoadMore(
    loading,
    error,
    fetchMore,
    pageInfo
  );

  const mappedData = map(categories, ({ id, name, abbr, createdAt }) => {
    // const { id, name, abbr, createdAt } = category;
    const actions = (
      <>
        <Link
          component={RouterLink}
          to={{
            pathname: `/editCategory/${id}`,
            state: { title: "Edit Category" },
          }}
        >
          <EditIcon className={classes.actionIcons} color="secondary" />
        </Link>
        <Link href="#" onClick={(e) => openDialog(e, id)}>
          <DeleteIcon className={classes.actionIcons} color="secondary" />
        </Link>
      </>
    );
    const created = moment(createdAt).format("MM/DD/YYYY");

    return {
      id,
      name,
      abbr,
      created,
      actions,
    };
  });

  return (
    <>
      <Title text="List Category" />
      <Table
        data={mappedData}
        loading={loading}
        colmuns={[
          // {
          //   label: "ID",
          //   field: "id",
          // },
          {
            label: "Category Name",
            field: "name",
          },
          {
            label: "Abbreviation",
            field: "abbr",
          },
          {
            label: "Created",
            field: "created",
          },
          {
            label: "Actions",
            field: "actions",
            align: "center",
          },
        ]}
      />
      <Button
        onClick={fetchMoreData}
        variant="contained"
        color="primary"
        disabled={!hasNextPage}
      >
        {isLoadingMore ? "Loading" : "Loard More"}
      </Button>
    </>
  );
};
