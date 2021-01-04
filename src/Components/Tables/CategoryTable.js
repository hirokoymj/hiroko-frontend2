import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { CATEGORIES } from "Queries/Category";
import { Table } from "Components/Tables/Table";
import { Title } from "Components/Titles/Title";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";
import { ActionLinkButton } from "Components/Buttons/ActionLinkButton";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    width: "30%",
    margin: "auto",
    marginTop: theme.spacing(3),
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
    const actions = (
      <>
        <ActionRouterButton
          to={`/categoryList/${id}`}
          title="Edit Category"
          icon="edit"
        />
        <ActionLinkButton onClick={(e) => openDialog(e, id)} icon="delete" />
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
      <Title text="Category List" />
      <Table
        data={mappedData}
        loading={loading}
        colmuns={[
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
        className={classes.submitButton}
      >
        {isLoadingMore ? "Loading" : "Loard More"}
      </Button>
    </>
  );
};
