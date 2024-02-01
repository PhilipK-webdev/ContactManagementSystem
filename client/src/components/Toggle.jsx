import { useRef, useEffect, forwardRef } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// eslint-disable-next-line react/display-name
const Toggle = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <FormGroup>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <FormControlLabel
          className="toggle"
          control={<Switch {...rest} ref={resolvedRef} />}
        />
      </div>
    </FormGroup>
  );
});

export default Toggle;
