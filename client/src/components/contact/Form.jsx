import {
  Button,
  FormControl,
  TextField,
  Grid,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";
import Spinner from "../shared/Spinner";
const Form = ({
  contactData,
  errors,
  handleInputChange,
  handleSubmitForm,
  isSubmitForm,
  isEditContactToggle,
}) => {
  const mobile = useMediaQuery("(max-width:1020px)");
  return (
    <FormControlStyle mobile={mobile ? 1 : 0}>
      <FormControl required>
        <Grid container direction={"row"} spacing={2}>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="First Name"
              id="outlined-size-small"
              value={contactData?.firstname}
              variant="outlined"
              size="small"
              name="firstname"
              onChange={handleInputChange}
              helperText={errors?.firstname}
              error={errors?.firstname ? true : false}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Last Name"
              id="outlined-size-small"
              value={contactData?.lastname}
              variant="outlined"
              size="small"
              name="lastname"
              onChange={handleInputChange}
              helperText={errors?.lastname}
              error={errors?.lastname ? true : false}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Country"
              id="outlined-size-small"
              value={contactData?.country}
              size="small"
              name="country"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={handleInputChange}
              helperText={errors?.country}
              error={errors?.country ? true : false}
            />
          </Grid>

          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="City"
              id="outlined-size-small"
              value={contactData?.city}
              size="small"
              name="city"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={handleInputChange}
              helperText={errors?.city}
              error={errors?.city ? true : false}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Street"
              id="outlined-size-small"
              value={contactData?.street}
              size="small"
              name="street"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={handleInputChange}
              helperText={errors?.street}
              error={errors?.street ? true : false}
            />
          </Grid>
          <Grid item xs={mobile ? 6 : 2} md={4} lg={2}>
            <TextField
              label="Zip Code"
              id="outlined-size-small"
              value={contactData?.zipcode}
              size="small"
              name="zipcode"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={handleInputChange}
              helperText={errors?.zipcode}
              error={errors?.zipcode ? true : false}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <TextField
              label="Email"
              id="outlined-size-small"
              value={contactData?.email}
              size="small"
              name="email"
              fullWidth={!mobile}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={handleInputChange}
              helperText={errors?.email}
              error={errors?.email ? true : false}
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
              value={contactData?.phone}
              size="small"
              name="phone"
              onChange={handleInputChange}
              helperText={errors?.phone}
              error={errors?.phone ? true : false}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3}></Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Button
              className="submit_form"
              variant="contained"
              size="large"
              onClick={(e) =>
                handleSubmitForm(e, isEditContactToggle ? "edit" : "submit")
              }
              color="secondary"
            >
              {isSubmitForm ? (
                <span style={{ marginLeft: "10px" }}>
                  <Spinner size={20} color={"white"} />
                </span>
              ) : isEditContactToggle ? (
                "Edit Form"
              ) : (
                " Submit Form"
              )}
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={3}></Grid>
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

  .css-k4qjio-MuiFormHelperText-root.Mui-error {
    position: absolute;
    top: 36px;
  }
  .submit_form {
    width: 100%;
    height: ${(props) => (props.mobile ? "28px" : "32px")};
    font-size: ${(props) => (props.mobile ? "15px" : "17px")};
    font-family: "Roboto Flex", sans-serif;
    text-transform: none;
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 10px;
    background-color: #626262;
    &:hover {
      background-color: #081c3c;
    }
  }
`;
export default Form;
