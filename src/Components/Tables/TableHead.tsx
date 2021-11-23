import React from "react";

import { FormSelectChip } from "Components/Forms/FormSelectChip";
import { Title } from "Components/Titles/Title";

type Props = {
  title: string;
  filters: [{ name: string; value: string }];
  handleFilterChange: (event: any) => void;
  selectedFilters: [];
  handleDeleteFilter: (value: string) => void;
  filterLabel: string;
};

export const TableHead = ({
  title,
  filters,
  handleFilterChange,
  selectedFilters,
  handleDeleteFilter,
  filterLabel,
}: Props) => {
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
