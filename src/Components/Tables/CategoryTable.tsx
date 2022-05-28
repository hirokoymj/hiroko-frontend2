import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { CATEGORIES } from "Queries/Category";
import { Table } from "Components/Tables/Table";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";
import { ActionButton } from "Components/Buttons/ActionButton";
import { TableHead } from "Components/Tables/TableHead";
import { useCategoryFilterState } from "Components/Tables/hooks/useCategoryFilterState";
import { ICategoriesVars, ICategoryFeed, IPageInfo } from "Types/api/Category";
import { ApolloError } from "apollo-client";
import { IActionProps } from "Types/common";

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

interface IFetchMoreResult {
  categories: ICategoryFeed;
}

const useLoadMore = (
  loading: boolean,
  error: ApolloError | undefined,
  fetchMore: Function,
  pageInfo: IPageInfo
) => {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { hasNextPage, endCursor } = pageInfo;
  const limit = 5;

  const fetchMoreData = () => {
    if (!loading && !error) {
      if (hasNextPage) {
        setIsLoadingMore(true);
        fetchMore({
          variables: { cursor: endCursor, limit },
          updateQuery: (
            prevResult: IFetchMoreResult,
            { fetchMoreResult }: any
          ) => {
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

type ICategoryTableProps = Pick<IActionProps, "openDialog">;

export const CategoryTable = ({ openDialog }: ICategoryTableProps) => {
  const classes = useStyles();
  const {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  } = useCategoryFilterState();
  const { data, loading, error, fetchMore } = useQuery<
    ICategoryFeed,
    ICategoriesVars
  >(CATEGORIES, {
    variables: {
      cursor: null,
      limit: 10,
      ...(selectedFilters.length !== 0 && {
        filter: selectedFilters,
      }),
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

  const mappedData = map(
    categories,
    ({ id, name, abbr, createdAt, updatedAt }) => {
      const actions = (
        <>
          <ActionRouterButton
            to={`/categoryList/${id}`}
            title="Edit Category"
            icon="edit"
          />
          <ActionButton onClick={() => openDialog(id)} icon="delete" />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");
      const updated = moment(updatedAt).format("MM/DD/YYYY");

      return {
        id,
        name,
        abbr,
        created,
        updated,
        actions,
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
            title="Category List"
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
                label: "Category",
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
                label: "Updated",
                field: "updated",
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
            color="secondary"
            disabled={!hasNextPage}
            className={classes.loadMoreButton}>
            {isLoadingMore ? "Loading" : "Loard More"}
          </Button>
        </>
      )}
    </>
  );
};
