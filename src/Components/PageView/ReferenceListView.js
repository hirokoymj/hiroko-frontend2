import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import keys from "lodash/keys";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { setTitle } from "Redux/Title/ActionCreator";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TOPIC_BY_CATEGORY_ABBR } from "Queries/Topic";
import { Title } from "Components/Titles/Title";

const ListItemLink = (props) => {
  return (
    <ListItem
      button
      component="a"
      {...props}
      divider
      target="_blank"
      rel="noopener"
    />
  );
};

const ReferenceListCard = ({ mappedData }) => {
  return (
    <div>
      {mappedData.map(({ cardTitle, topicData }, key) => {
        return (
          <Paper style={{ marginBottom: "25px" }} key={key}>
            <Title text={cardTitle} />
            <List>
              {topicData.map((topic, key) => {
                return (
                  <ListItemLink href={topic.url} key={key}>
                    <ListItemText primary={topic.title} />
                  </ListItemLink>
                );
              })}
            </List>
          </Paper>
        );
      })}
    </div>
  );
};

export const ReferenceListView = connect(null, { setTitle })(
  ({ setTitle, title }) => {
    const { abbr } = useParams();
    const { data, loading } = useQuery(TOPIC_BY_CATEGORY_ABBR, {
      variables: {
        abbr,
      },
    });
    const topics = get(data, "topicByCategoryAbbr", []);
    const topicsByGroup = groupBy(topics, "subCategory.id");

    const mappedData = keys(topicsByGroup).map((key, index) => {
      return {
        cardTitle: get(topicsByGroup[key][0], "subCategory.name", ""),
        topicData: topicsByGroup[key],
      };
    });

    return (
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {loading ? (
              "loading"
            ) : (
              <ReferenceListCard mappedData={mappedData} />
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }
);
