import React from "react";

import { FormSelectChip } from "Components/Forms/FormSelectChip";
import { Title } from "Components/Titles/Title";

export const TableHead = ({
  title,
  filters,
  handleFilterChange,
  selectedFilters,
  handleDeleteFilter,
  filterLabel,
}) => {
  return (
    <>
      <Title text={title} />
      <FormSelectChip
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleDeleteFilter={handleDeleteFilter}
        selectedFilters={selectedFilters}
        filterLabel={filterLabel}
      />
    </>
  );
};
