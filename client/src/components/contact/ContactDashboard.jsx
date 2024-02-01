import { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "./Form";
import ContactsTable from "../contact/ContactsTable";
import { useMediaQuery, Button } from "@mui/material";
import {
  validEmail,
  validTextField,
  validZipCode,
  validPhoneNumber,
  validStreet,
} from "../../utils/index.js";

const ContactDashboard = () => {
  const mobile = useMediaQuery("(max-width:1020px)");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const getAllContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      if (response.status === 200) {
        const data = await response.json();
        setContacts(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllContacts();
  }, []);

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (
      name === "firstName" ||
      name === "lastName" ||
      name === "country" ||
      name === "city"
    ) {
      error = !validTextField(value) ? "Invalid text" : "";
    } else if (name === "phone") {
      error = !validPhoneNumber(value) ? "Invalid number" : "";
    } else if (name === "zipCode") {
      error = !validZipCode(value) ? "Invalid zip code" : "";
    } else if (name === "email") {
      error = !validEmail(value) ? "Invalid email" : "";
    } else if (name === "street") {
      error = !validStreet(value) ? "Invalid street" : "";
    }
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formIsValid = Object.values(errors).every((error) => {
      return error === "";
    });
    const stateIsNotEmpty = Object.values(contactData).some((contact) => {
      return contact === "";
    });
    if (formIsValid && !stateIsNotEmpty) {
      setIsSubmitForm(true);
      try {
        const options = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...contactData,
            zipcode: Number(contactData.zipCode),
          }),
        };
        // const response = await fetch(`/api/create`, options);
        console.log(contactData);
      } catch (error) {
        console.log("Error=>", error);
      }
    }
  };
  const handleClickExportToCSV = () => {
    console.log("Export to CSV");
    console.log(contacts);
  };

  const handleRemove = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/delete/${id}`, options);
      if (response.status === 200) {
        getAllContacts();
      }
    } catch (error) {
      console.log("Error=>", error);
    }
  };
  return (
    <ContactDashboardStyle>
      <ContacDashboardCard mobile={mobile ? 1 : 0}>
        <div className="dashboard_header">
          {" "}
          <h4>Create new contact</h4>
          <Button
            variant="contained"
            className="export_csv"
            onClick={handleClickExportToCSV}
          >
            Export to CSV
          </Button>
        </div>
        <FormStyle>
          <Form
            isSubmitForm={isSubmitForm}
            handleSubmitForm={handleSubmitForm}
            contactData={contactData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        </FormStyle>
        <TableStyle>
          <ContactsTable
            contacts={contacts}
            isLoading={isLoading}
            handleRemove={handleRemove}
          />
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
    &:hover {
      background-color: #010101;
    }
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
    @media (max-width: 1230px) {
      padding: 3px;
    }
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
    @media (max-width: 1230px) {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;
export default ContactDashboard;
