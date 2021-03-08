import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { SUB_CATEGORIES } from "Queries/SubCategory";
import { Table } from "Components/Tables/Table";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";
import { ActionLinkButton } from "Components/Buttons/ActionLinkButton";
import { useCategoryFilterState } from "Components/Tables/hooks/useCategoryFilterState";
import { TableHead } from "Components/Tables/TableHead";

const useStyles = makeStyles((theme) => ({
  loadMoreButton: {
    width: "30%",
    margin: "auto",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
            fetchMoreResult.subCategories.subCategoryFeed = [
              ...prevResult.subCategories.subCategoryFeed,
              ...fetchMoreResult.subCategories.subCategoryFeed,
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

export const SubCategoryTable = ({ openDialog }) => {
  const classes = useStyles();
  const {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  } = useCategoryFilterState();
  const { data, loading, error, fetchMore } = useQuery(SUB_CATEGORIES, {
    variables: {
      cursor: null,
      limit: 5,
      ...(selectedFilters.length !== 0 && {
        filter: selectedFilters,
      }),
    },
  });
  const subCategories = get(data, "subCategories.subCategoryFeed", []);
  const pageInfo = !loading && get(data, "subCategories.pageInfo", {});
  const { isLoadingMore, fetchMoreData, hasNextPage } = useLoadMore(
    loading,
    error,
    fetchMore,
    pageInfo
  );

  const mappedData = map(
    subCategories,
    ({ id, name, order, category, createdAt }) => {
      const categoryId = get(category, "id", "");
      const categoryName = get(category, "name", "");
      const actions = (
        <>
          <ActionRouterButton
            to={`/subCategoryList/${id}`}
            title="Edit Sub Category"
            icon="edit"
          />
          <ActionLinkButton onClick={(e) => openDialog(e, id)} icon="delete" />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");

      return {
        id,
        name,
        order,
        categoryId,
        categoryName,
        actions,
        created,
      };
    }
  );

  return (
    <>
      {loading || category_loading ? (
        <div>...loading</div>
      ) : (
        <>
          <TableHead
            loading={loading || category_loading}
            title="Sub Category List"
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleDeleteFilter={handleDeleteFilter}
            selectedFilters={selectedFilters}
            filterLabel="Filter by Category"
          />
          <Table
            data={mappedData}
            loading={loading}
            colmuns={[
              {
                label: "Sub Category",
                field: "name",
              },
              {
                label: "Category",
                field: "categoryName",
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
            className={classes.loadMoreButton}>
            {isLoadingMore ? "Loading" : "Loard More"}
          </Button>
        </>
      )}
    </>
  );
};
