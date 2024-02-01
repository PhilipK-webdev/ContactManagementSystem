import { TextField, Grid, useMediaQuery } from "@mui/material";
const ColumnFilter = ({ column }) => {
  const { setFilter } = column;
  const mobile = useMediaQuery("(max-width:1020px)");
  return (
    <Grid item xs={12} md={12} lg={12}>
      <TextField
        size="small"
        variant="outlined"
        value={column.filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
        inputProps={{
          style: {
            backgroundColor: "white",
            height: "20px",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          },
        }}
        sx={{
          border: "none",
          "& fieldset": { border: "none" },
        }}
        InputProps={{
          style: {
            fontSize: "13px",
            width: mobile && "52px",
          },
        }}
      />
    </Grid>
  );
};

export default ColumnFilter;
