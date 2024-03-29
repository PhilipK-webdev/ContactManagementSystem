import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import Spinner from "../shared/Spinner";
import CustomPagination from "../shared/CustomPagination";
import CustomTableCell from "../shared/CustomTableCell";
import useTableCustom from "../../hooks/useTableCustom.jsx";

const ContactsTable = ({
  contacts,
  isLoading,
  handleRemove,
  onChangeToggle,
  isEditContactToggle,
}) => {
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
  } = useTableCustom({
    contacts,
    onChangeToggle,
    handleRemove,
  });

  const { pageIndex } = state;
  const handleResetSelectedRows = () => {
    state.selectedRowIds = {};
    state.selectedFlatRows = [];
  };

  if (!isEditContactToggle) {
    handleResetSelectedRows();
  }
  return isLoading ? (
    <div style={{ margin: "auto" }}>
      <Spinner size={60} color={"#265FA9"} />
    </div>
  ) : (
    contacts && contacts.length > 0 && (
      <LayoutTable>
        <TableContainer component={Paper}>
          <Table
            {...getTableProps()}
            sx={{
              "& .MuiTableRow-root:hover": {
                backgroundColor: "#DFE1EA",
              },
            }}
          >
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell key={column.id}>
                      <CustomTableCell column={column} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
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
        <CustomPagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      </LayoutTable>
    )
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
  .head_cell_body {
    display: flex;
    align-items: center;
    @media (max-width: 1230px) {
      flex-direction: column;
      align-items: start;
      justify-content: start;
    }
  }

  .head_cell_title {
    @media (max-width: 1230px) {
      font-size: 10px;
      width: 60px;
    }
  }
  .delete_icon:hover {
    color: #d32f2f;
  }
`;
export default ContactsTable;
