import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { TOPICS } from "Queries/Topic";
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
            fetchMoreResult.topics.topicFeed = [
              ...prevResult.topics.topicFeed,
              ...fetchMoreResult.topics.topicFeed,
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

export const TopicTable = ({ openDialog }) => {
  const classes = useStyles();
  const {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  } = useCategoryFilterState();
  const { data, loading, error, fetchMore } = useQuery(TOPICS, {
    variables: {
      cursor: null,
      limit: 5,
      ...(selectedFilters.length !== 0 && {
        filter: selectedFilters,
      }),
    },
  });

  const topics = !loading && get(data, "topics.topicFeed", []);
  const pageInfo = !loading && get(data, "topics.pageInfo", {});
  const { isLoadingMore, fetchMoreData, hasNextPage } = useLoadMore(
    loading,
    error,
    fetchMore,
    pageInfo
  );

  const mappedData = map(
    topics,
    ({ id, title, url, category, subCategory, createdAt }) => {
      const categoryName = get(category, "name", "");
      const subCategoryName = get(subCategory, "name", "");

      const titleLink = (
        <Link href={url} variant="body2" target="_blank" rel="noreferrer">
          {title}
        </Link>
      );

      const actions = (
        <>
          <ActionRouterButton
            to={`/topicList/${id}`}
            title="Edit Topic"
            icon="edit"
          />
          <ActionLinkButton onClick={(e) => openDialog(e, id)} icon="delete" />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");

      return {
        id,
        titleLink,
        url,
        categoryName,
        subCategoryName,
        created,
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
            loading={loading || category_loading}
            title="Topic List"
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
                label: "Title",
                field: "titleLink",
              },
              {
                label: "Category",
                field: "categoryName",
              },
              {
                label: "Sub Category",
                field: "subCategoryName",
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
