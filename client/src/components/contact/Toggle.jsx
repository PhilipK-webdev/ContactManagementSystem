import { useRef, useEffect, forwardRef } from "react";
import { Tooltip, Switch, FormControlLabel, FormGroup } from "@mui/material";

const Toggle = forwardRef(
  ({ indeterminate, onChangeToggle, id, isDisabled, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    delete rest.title;
    const { onChange, checked } = rest;
    return (
      <FormGroup>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <FormControlLabel
            className="toggle"
            control={
              <Tooltip title="Edit contact" placement="top">
                <Switch
                  onChange={(e) => {
                    onChangeToggle(e, id);
                    onChange(e);
                  }}
                  checked={checked}
                  ref={resolvedRef}
                  disabled={isDisabled && !checked}
                />
              </Tooltip>
            }
          />
        </div>
      </FormGroup>
    );
  }
);

export default Toggle;
