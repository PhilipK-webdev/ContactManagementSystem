import { useEffect, useState, useMemo } from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import Toggle from "./Toggle";
import styled from "styled-components";
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
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => <Toggle {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const firestPageRows = rows.slice(0, 10);
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
    <LayoutTable>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-key
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <span className="pagination_title">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <Pagination
          count={pageOptions.length}
          page={pageIndex + 1}
          onChange={(event, selectedPage) => {
            gotoPage(selectedPage - 1); // Use gotoPage instead of nextPage
          }}
          variant="outlined"
          color="primary"
          size="small"
          disabled={!canNextPage && !canPreviousPage}
        />
      </div>
    </LayoutTable>
  );
};

const LayoutTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    align-items: end;
    flex-direction: column;
    .pagination_title {
      margin-bottom: 10px;
      margin-right: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .css-1h4i5l4-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
    background: #265fa9;
    color: white;
  }
`;
export default RowSelection;
