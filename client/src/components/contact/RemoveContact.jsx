import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
const RemoveContact = (props) => {
  return (
    <Tooltip title="Delete" placement="top">
      <DeleteIcon
        className="delete_icon"
        style={props.style}
        onClick={() => {
          props.handleRemove(props.id);
        }}
      />
    </Tooltip>
  );
};
export default RemoveContact;
