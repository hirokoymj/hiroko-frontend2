import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Container from "@material-ui/core/Container";

import { GET_CATEGORIES } from "../../Queries/Category";
import { Table } from "../Tables/Table";

export const CategoryTable = ({ open, openDialog }) => {
  const { data, loading } = useQuery(GET_CATEGORIES);
  console.log(data);
  const categories = get(data, "categories");
  const mappedData = map(categories, (category) => {
    const { id, name } = category;

    return {
      id,
      name,
    };
  });

  return (
    <Container maxWidth="md">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Table
          data={mappedData}
          tableTitle="Category List"
          colmuns={[
            {
              label: "ID",
              field: "id",
            },
            {
              label: "Category Name",
              field: "name",
            },
          ]}
        />
      )}
    </Container>
  );
};
