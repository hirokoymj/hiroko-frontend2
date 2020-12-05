import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

import { ALL_TOPIC_VIEWS } from "../../Queries/Topic";
import { Table } from "../Tables/Table";

export const TopicTable = ({ open, openDialog }) => {
  const { data, loading } = useQuery(ALL_TOPIC_VIEWS);
  const topics = get(data, "allTopicViews.nodes");

  const mappedData = map(topics, (topic) => {
    const {
      id,
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      title,
      url,
    } = topic;

    const urlLink = (
      <Link href={url} variant="body2" target="_blank" rel="noreferrer">
        {title}
      </Link>
    );

    const actions = (
      <>
        <Link component={RouterLink} to={`editTopic/${id}`}>
          <EditIcon />
        </Link>
        <Link href="#" onClick={(e) => openDialog(e, id)}>
          <DeleteIcon />
        </Link>
      </>
    );

    return {
      id,
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      title: urlLink,
      actions: actions,
    };
  });

  return (
    <Container maxWidth="md">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Table
          data={mappedData}
          tableTitle="Topic List"
          colmuns={[
            {
              label: "Category",
              field: "categoryName",
            },
            {
              label: "Sub Category",
              field: "subcategoryName",
            },
            {
              label: "Title",
              field: "title",
            },
            {
              label: "Actions",
              field: "actions",
            },
          ]}
        />
      )}
    </Container>
  );
};
