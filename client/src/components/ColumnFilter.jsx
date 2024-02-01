import { TextField, Grid } from "@mui/material";
const ColumnFilter = ({ column }) => {
  const { setFilter } = column;

  return (
    <Grid item xs={12} md={4} lg={2}>
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
          },
        }}
        sx={{ border: "none", "& fieldset": { border: "none" } }}
        InputProps={{ style: { fontSize: "13px" } }}
      />
    </Grid>
  );
};

export default ColumnFilter;
