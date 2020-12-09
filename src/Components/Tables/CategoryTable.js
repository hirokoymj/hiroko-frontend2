import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
// import Container from "@material-ui/core/Container";

import { CATEGORIES } from "Queries/Category";
import { Table } from "Components/Tables/Table";

export const CategoryTable = () => {
  const { data, loading } = useQuery(CATEGORIES);
  console.log(data);
  const categories = get(data, "categories");
  const mappedData = map(categories, (category) => {
    const { id, name, order } = category;
    return {
      id,
      name,
      order,
    };
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Table
          data={mappedData}
          colmuns={[
            {
              label: "ID",
              field: "id",
            },
            {
              label: "Category Name",
              field: "name",
            },
            {
              label: "Order",
              field: "order",
              align: "right",
            },
          ]}
        />
      )}
    </div>
  );
};
