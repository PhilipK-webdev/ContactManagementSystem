import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import Toggle from "../Toggle";
import BasicTable from "../BasicTable";
import { useMediaQuery } from "@mui/material";
const ContactDashboard = () => {
  const [checked, setToggleEditOrCreateUser] = useState(false);
  const mobile = useMediaQuery("(max-width:1020px)");
  return (
    <ContactDashboardStyle>
      <ContacDashboardCard toggle={checked ? 1 : 0} mobile={mobile ? 1 : 0}>
        <Toggle checked={checked} setChecked={setToggleEditOrCreateUser} />
        <FormStyle toggle={checked ? 1 : 0}>{checked && <Form />}</FormStyle>
        <TableStyle>{/* <BasicTable /> */}</TableStyle>
      </ContacDashboardCard>
    </ContactDashboardStyle>
  );
};

const ContactDashboardStyle = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContacDashboardCard = styled.div`
  height: 95%;
  width: 80%;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .MuiFormControlLabel-label {
    color: #265fa9;
  }
  h4 {
    text-align: left;
    margin: 0;
    font-size: 20px;
    margin-left: 12px;
    color: #265fa9;
    text-decoration: underline;
  }
  .toggle {
    margin-bottom: ${(props) => (props.toggle ? "0" : "20px")};
    width: 10%;
  }
`;

const FormStyle = styled.div`
  width: 100%;
  display: ${(props) => (props.toggle ? "flex" : "none")};
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: ${(props) => (props.toggle ? "center" : "start")};
`;
const TableStyle = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid red;
  display: flex;
`;
export default ContactDashboard;
