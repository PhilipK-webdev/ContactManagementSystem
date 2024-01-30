import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";

const SortingTable = () => {
  const [contacts, setContacts] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => contacts, [contacts]);
  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        if (response.status === 200) {
          const data = await response.json();
          setContacts(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllContacts();
  }, []);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, colIndex) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={colIndex}
              >
                {column.id === "firstname" ? (
                  <>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : "⏫"}
                    </span>
                  </>
                ) : (
                  column.render("Header")
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, indexRow) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={indexRow}>
              {row.cells.map((cell, indexCell) => {
                return (
                  <td key={indexCell} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup, indexGroup) => {
          return (
            <tr key={indexGroup} {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column, indexFooter) => {
                return (
                  <td key={indexFooter} {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tfoot>
    </table>
  );
};

export default SortingTable;
