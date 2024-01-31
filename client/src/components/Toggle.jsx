import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const Toggle = ({ checked, setChecked }) => {
  return (
    <FormGroup>
      <div>
        <h4>Create New Contact</h4>
        <FormControlLabel
          className="toggle"
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
        />
      </div>
    </FormGroup>
  );
};

export default Toggle;
