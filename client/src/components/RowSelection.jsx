import { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useFilters,
  useSortBy,
} from "react-table";
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
import SwapVertIcon from "@mui/icons-material/SwapVert";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import Toggle from "./Toggle";
import styled from "styled-components";
const RowSelection = () => {
  const [contacts, setContacts] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => contacts, [contacts]);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,

    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },

    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          disableFilters: true,
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => <Toggle {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
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
  const { pageIndex } = state;
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
                  <TableCell>
                    <div
                      className={
                        column.canSort
                          ? column.Header === "First Name" ||
                            column.Header === "Last Name"
                            ? "head_cell_v1"
                            : "head_cell_v2"
                          : ""
                      }
                    >
                      <div
                        style={{
                          textDecoration:
                            column.id === "selection" ? "" : "underline",
                        }}
                      >
                        {column.render("Header")}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {column.canFilter ? column.render("Filter") : null}
                        <span>
                          {column.canSort ? (
                            <div
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents sorting when clicking on the cell outside the icon
                                column.getSortByToggleProps().onClick(e);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SouthIcon
                                    fontSize="small"
                                    style={{ marginTop: "10px" }}
                                  />
                                ) : (
                                  <NorthIcon
                                    fontSize="small"
                                    style={{ marginTop: "10px" }}
                                  />
                                )
                              ) : (
                                <SwapVertIcon style={{ marginTop: "10px" }} />
                              )}
                            </div>
                          ) : null}
                        </span>
                      </div>
                    </div>
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

  .head_cell_v1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .head_cell_v2 {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .css-batk84-MuiInputBase-root-MuiFilledInput-root::before {
    border-bottom: none;
  }
`;
export default RowSelection;
