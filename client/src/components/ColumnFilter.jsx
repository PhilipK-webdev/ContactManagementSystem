import React from "react";

const ColumnFilter = ({ column }) => {
  const { setFilter } = column;

  return (
    <span>
      Search: {""}
      <input
        value={column.filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
