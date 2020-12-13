import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

export const ReferenceListView = (props) => {
  const { category } = useParams();
  console.log("Test Page");
  console.log(category);
  return (
    <DashboardLayout>
      <h1>TEST Page Category: {category}</h1>
    </DashboardLayout>
  );
};
