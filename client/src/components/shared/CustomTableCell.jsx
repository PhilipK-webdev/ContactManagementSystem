import SwapVertIcon from "@mui/icons-material/SwapVert";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { Tooltip } from "@mui/material";
const CustomTableCell = ({ column }) => {
  return (
    <div
      className={
        column.canSort
          ? column.Header === "First Name" || column.Header === "Last Name"
            ? "head_cell_v1"
            : "head_cell_v2"
          : ""
      }
    >
      <div
        style={{
          textDecoration:
            column.id === "selection" || column.id === "selection2"
              ? ""
              : "underline",
        }}
        className="head_cell_title"
      >
        {column.render("Header")}
      </div>
      <div className="head_cell_body">
        {column.canFilter ? column.render("Filter") : null}
        <span>
          {column.canSort ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                column.getSortByToggleProps().onClick(e);
              }}
              style={{ cursor: "pointer" }}
            >
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <SouthIcon fontSize="small" style={{ marginTop: "10px" }} />
                ) : (
                  <NorthIcon fontSize="small" style={{ marginTop: "10px" }} />
                )
              ) : (
                <Tooltip title="Sort">
                  <SwapVertIcon style={{ marginTop: "10px" }} />
                </Tooltip>
              )}
            </div>
          ) : null}
        </span>
      </div>
    </div>
  );
};

export default CustomTableCell;
