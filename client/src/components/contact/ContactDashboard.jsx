import React from "react";
import styled from "styled-components";
const ContactDashboard = () => {
  return (
    <ContactDashboardStyle>
      <ContacDashboardCard>
        <FormStyle>Form Component</FormStyle>
        <TableStyle>table</TableStyle>
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
  height: 90%;
  width: 80%;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const FormStyle = styled.div`
  height: 150px;
  width: 100%;
  border: 1px solid green;
  display: flex;
`;
const TableStyle = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid red;
  display: flex;
`;
export default ContactDashboard;
