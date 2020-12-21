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

import { TOPICS } from "Queries/Topic";
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
  const { data, loading, error, fetchMore } = useQuery(TOPICS, {
    variables: {
      limit: 5,
      cursor: null,
    },
  });
  console.log("TopicTable");
  if (!loading) {
    console.log(data);
  }
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
      <Title text="Topic List" />
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
            align: "right",
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
