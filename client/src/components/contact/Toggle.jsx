import { useRef, useEffect, forwardRef } from "react";
import { Tooltip, Switch, FormControlLabel, FormGroup } from "@mui/material";
const Toggle = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  delete rest.title;
  return (
    <FormGroup>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <FormControlLabel
          className="toggle"
          control={
            <Tooltip title="Edit contact" placement="top">
              <Switch {...rest} ref={resolvedRef} />
            </Tooltip>
          }
        />
      </div>
    </FormGroup>
  );
});

export default Toggle;
