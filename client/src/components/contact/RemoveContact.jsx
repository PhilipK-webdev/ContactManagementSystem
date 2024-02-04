import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
const RemoveContact = (props) => {
  return (
    <Tooltip title="Delete user" placement="top">
      <DeleteIcon
        className="delete_icon"
        style={props.style}
        onClick={() => {
          console.log("row", props.row);
          props.handleRemove(props.id);
        }}
      />
    </Tooltip>
  );
};
export default RemoveContact;
