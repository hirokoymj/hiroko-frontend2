import React from "react";

import { CategoryTable } from "./Tech/CategoryTable";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

export const Home = () => {
  return (
    <DashboardLayout>
      <h2>Home</h2>
    </DashboardLayout>
  );
};

export const CategoryList = () => {
  return (
    <DashboardLayout>
      <CategoryTable />
    </DashboardLayout>
  );
};

export const SubCategoryList = () => {
  return (
    <DashboardLayout>
      <h1>Sub Category List Page</h1>
    </DashboardLayout>
  );
};

export const TopicList = () => {
  return (
    <DashboardLayout>
      <h1>Topic List Page</h1>
    </DashboardLayout>
  );
};
