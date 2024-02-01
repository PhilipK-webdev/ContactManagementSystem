import { Pagination } from "@mui/material";
const CustomPagination = ({
  pageIndex,
  pageOptions,
  gotoPage,
  canNextPage,
  canPreviousPage,
}) => {
  return (
    <div className="pagination">
      <span className="pagination_title">
        Page {pageIndex + 1} of {pageOptions.length}
      </span>
      <Pagination
        count={pageOptions.length}
        page={pageIndex + 1}
        onChange={(event, selectedPage) => {
          gotoPage(selectedPage - 1);
        }}
        variant="outlined"
        color="primary"
        size="small"
        disabled={!canNextPage && !canPreviousPage}
      />
    </div>
  );
};

export default CustomPagination;
