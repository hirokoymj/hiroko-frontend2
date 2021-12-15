import React from "react";

import { FormSelectChip } from "Components/Forms/FormSelectChip";
import { Title } from "Components/Titles/Title";
import { ITableFilterOption } from "Types/common";

type Props = {
  title: string;
  filters: ITableFilterOption[];
  handleFilterChange: (event: any) => void;
  handleDeleteFilter: (value: string) => any;
  filterLabel?: string;
  selectedFilters?: string[];
};

export const TableHead = ({
  title,
  filters,
  handleFilterChange,
  handleDeleteFilter,
  selectedFilters,
  filterLabel,
}: Props) => {
  return (
    <>
      <Title text={title} />
      <FormSelectChip
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleDeleteFilter={handleDeleteFilter}
        selectedFilters={selectedFilters || []}
        filterLabel={filterLabel || ""}
      />
    </>
  );
};
