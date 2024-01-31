import React, { useEffect, useState, useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./CheckBox";
const RowSelection = () => {
  const [contacts, setContacts] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => contacts, [contacts]);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
    selectedFlatRows,
    footerGroups,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const firestPageRows = rows.slice(0, 10);
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
          {firestPageRows.map((row, indexRow) => {
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
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default RowSelection;
