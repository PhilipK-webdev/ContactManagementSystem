import { useEffect, useState, useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import "./table.css";
const FilteringTable = () => {
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
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter);
  const { globalFilter } = state;
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
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, colIndex) => (
                <th {...column.getHeaderProps()} key={colIndex}>
                  {column.render("Header")}
                  {console.log(column)}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
    </>
  );
};

export default FilteringTable;
