import React, { useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  Grid,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";
const Form = () => {
  const [firstName, setFirstName] = useState("");
  const mobile = useMediaQuery("(max-width:1020px)");
  return (
    <FormControlStyle mobile={mobile ? 1 : 0}>
      <FormControl required>
        <Grid container direction={"row"} spacing={2}>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="First Name"
              id="outlined-size-small"
              value={firstName}
              variant="outlined"
              size="small"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              helperText={firstName}
              error={firstName ? true : false}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Last Name"
              id="outlined-size-small"
              // value={lastName}
              size="small"
              name="lastName"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Country"
              id="outlined-size-small"
              // value={email}
              size="small"
              name="email"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorEmail}
              // error={errorEmail ? true : false}
            />
          </Grid>

          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="City"
              id="outlined-size-small"
              // value={lastName}
              size="small"
              name="lastName"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Street"
              id="outlined-size-small"
              // value={lastName}
              size="small"
              name="lastName"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Zip Code"
              id="outlined-size-small"
              // value={lastName}
              size="small"
              name="lastName"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <TextField
              label="Email"
              id="outlined-size-small"
              // value={lastName}
              size="small"
              name="lastName"
              fullWidth={!mobile}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <TextField
              label="Phone"
              id="outlined-size-small"
              fullWidth={!mobile}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              // value={lastName}
              size="small"
              name="lastName"
              // onChange={handleChange}
              // helperText={errorLastName}
              // error={errorLastName ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="submit_form"
              variant="contained"
              size="large"
              // onClick={handleSubmit}
              color="primary"
            >
              Submit Form
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormControlStyle>
  );
};

const FormControlStyle = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  font-family: "Roboto Flex";
  font-weight: 500;
  .MuiFormControl-root {
    flex-direction: row;
    align-items: start;
    margin-top: 10px;
    width: 100%;
    @media (max-width: 820px) {
      width: 100%;
      margin-top: 0;
    }
  }
  .MuiButtonBase-root {
    height: 39px;
    margin-top: 10px;
    background: #265fa9;
    &:hover {
      background: #265fa9;
    }
  }
  .css-k4qjio-MuiFormHelperText-root.Mui-error {
    position: absolute;
    top: 36px;
  }
  .submit_form {
    width: 100%;
    height: ${(props) => (props.mobile ? "20px" : "32px")};
    color: white;
    font-size: ${(props) => (props.mobile ? "10px" : "18px")};
    font-family: "Roboto Flex", sans-serif;
    text-transform: none;
  }
`;
export default Form;
