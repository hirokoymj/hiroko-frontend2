import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import keys from "lodash/keys";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TOPIC_BY_CATEGORY_ABBR } from "Queries/Topic";
import { Title } from "Components/Titles/Title";
import { ListSkeleton } from "Components/Skeleton/ListSkeleton";
import { ITopic, ITopicByCategoryAbbrVars } from "Types/api/Topic";

const useStyles = makeStyles((theme: Theme) => ({
  linkRoot: {
    "&:hover": {
      backgroundColor: "#fce4ec",
    },
  },
}));

const ListItemLink = (props: ListItemProps<"a", { button?: true }>) => {
  return (
    <ListItem
      button
      component="a"
      divider
      target="_blank"
      rel="noopener"
      {...props}
    />
  );
};

interface IMappedData {
  cardTitle: string;
  topicData: ITopic[];
}

interface IProps {
  mappedData: IMappedData[];
}

const ReferenceListCard = ({ mappedData }: IProps) => {
  const classes = useStyles();

  return (
    <div>
      {mappedData.map((data: any, key: number) => {
        const { cardTitle, topicData } = data;
        return (
          <Paper style={{ marginBottom: "25px" }} key={key}>
            <Title text={cardTitle} />
            <List>
              {topicData.map((topic: ITopic, key: number) => {
                return (
                  <ListItemLink
                    href={topic.url}
                    key={key}
                    className={classes.linkRoot}>
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

export const ReferenceListView = () => {
  const { abbr } = useParams<{ abbr: string }>();
  const { data, loading } = useQuery<ITopic, ITopicByCategoryAbbrVars>(
    TOPIC_BY_CATEGORY_ABBR,
    {
      variables: {
        abbr,
      },
    }
  );
  const topics = get(data, "topicByCategoryAbbr", []);
  const topicsByGroup = groupBy(topics, "subCategory.id");
  const ordered: any = {};
  Object.keys(topicsByGroup).forEach((key) => {
    ordered[key] = topicsByGroup[key];
  });

  const mappedData = keys(ordered).map((key) => {
    return {
      cardTitle: get(ordered[key][0], "subCategory.name", ""),
      topicData: ordered[key],
    };
  });

  return (
    <DashboardLayout title="Technical References">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <ListSkeleton />
          ) : (
            <ReferenceListCard mappedData={mappedData} />
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
