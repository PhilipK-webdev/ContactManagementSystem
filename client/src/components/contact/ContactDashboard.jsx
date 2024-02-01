import styled from "styled-components";
import Form from "./Form";
import RowSelection from "../RowSelection";
import { useMediaQuery, Button } from "@mui/material";
const ContactDashboard = () => {
  const mobile = useMediaQuery("(max-width:1020px)");
  return (
    <ContactDashboardStyle>
      <ContacDashboardCard mobile={mobile ? 1 : 0}>
        <div className="dashboard_header">
          {" "}
          <h4>Create new contact</h4>
          <Button
            variant="contained"
            className="export_csv"
            // onClick={handleSubmit}
          >
            Export to CSV
          </Button>
        </div>
        <FormStyle>
          <Form />
        </FormStyle>
        <TableStyle>
          <RowSelection />
        </TableStyle>
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
  font-family: "Roboto Flex";
  font-weight: 500;
`;

const ContacDashboardCard = styled.div`
  height: 99%;
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
    height: 50px;
    @media (max-width: 820px) {
      font-size: 15px;
    }
  }
  .toggle {
    margin-left: 0;
    margin-right: 0;
  }
  .dashboard_header {
    display: flex;
    justify-content: space-between;
  }
  .export_csv {
    height: ${(props) => (props.mobile ? "20px" : "28px")};
    background-color: #010101;
    color: white;
    font-size: ${(props) => (props.mobile ? "10px" : "13px")};
    font-family: "Roboto Flex", sans-serif;
    text-transform: none;
  }
`;

const FormStyle = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: start;
`;
const TableStyle = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  th,
  td {
    border-collapse: collapse;
    font-family: "Roboto Flex";
    font-weight: 500;
  }
  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #265fa9;
    color: white;
  }
`;
export default ContactDashboard;
