import React, { useEffect, useState, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
const PaginationTable = () => {
  const [contacts, setContacts] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => contacts, [contacts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, colIndex) => (
                <th {...column.getHeaderProps()} key={colIndex}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, indexRow) => {
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
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page: {""}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[2, 4, 6].map((pageSize) => {
            return (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            );
          })}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          ⬅️
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          ➡️
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
