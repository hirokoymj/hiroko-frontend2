import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { TOPICS } from "Queries/Topic";
import { Table } from "Components/Tables/Table";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";
import { ActionButton } from "Components/Buttons/ActionButton";
import { useCategoryFilterState } from "Components/Tables/hooks/useCategoryFilterState";
import { TableHead } from "Components/Tables/TableHead";
import { IActionProps } from "Types/common";
import { ITopicsVars, ITopicFeed } from "Types/api/Topic";
import { IPageInfo } from "Types/api/Category";
import { ApolloError } from "apollo-client";

const useStyles = makeStyles((theme: Theme) => ({
  loadMoreButton: {
    width: "30%",
    margin: "auto",
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

interface IFetchMoreResult {
  topics: ITopicFeed;
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

type ITopicTableProps = Pick<IActionProps, "openDialog">;

export const TopicTable = ({ openDialog }: ITopicTableProps) => {
  const classes = useStyles();
  const {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  } = useCategoryFilterState();
  const { data, loading, error, fetchMore } = useQuery<ITopicFeed, ITopicsVars>(
    TOPICS,
    {
      variables: {
        cursor: null,
        limit: 10,
        ...(selectedFilters.length !== 0 && {
          filter: selectedFilters,
        }),
      },
    }
  );

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
    ({
      id,
      title,
      url,
      category,
      subCategory,
      order,
      createdAt,
      updatedAt,
    }) => {
      const categoryName = get(category, "name", "");
      const subCategoryName = get(subCategory, "name", "");

      const titleLink = (
        <Link
          href={url}
          variant="body2"
          target="_blank"
          rel="noreferrer"
          color="secondary">
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
          <ActionButton onClick={() => openDialog(id)} icon="delete" />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");
      const updated = moment(updatedAt).format("MM/DD/YYYY");

      return {
        id,
        titleLink,
        url,
        categoryName,
        subCategoryName,
        created,
        updated,
        actions,
        order,
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
            hover={true}
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
                label: "Order",
                field: "order",
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
