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
  csvData,
} from "../../utils/index.js";
import AlertMessage from "../shared/AlertMessage.jsx";
import { CSVLink } from "react-csv";
import ModalMessage from "../shared/ModalMessage.jsx";

const ContactDashboard = () => {
  const mobile = useMediaQuery("(max-width:1020px)");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [isEditContactToggle, setIsEditContactToggle] = useState(false);
  const [toggleId, setToggleId] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    msg: "",
    color: "",
  });
  const [open, setOpen] = useState(false);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [stage, setStage] = useState("");

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        if (response.status === 200) {
          const data = await response.json();
          !data || data.length === 0 ? setOpen(true) : setContacts(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };
    getAllContacts();
  }, []);

  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (
      name === "firstname" ||
      name === "lastname" ||
      name === "country" ||
      name === "city"
    ) {
      error = !validTextField(value) ? "Invalid text" : "";
    } else if (name === "phone") {
      error = !validPhoneNumber(value) ? "Invalid number" : "";
    } else if (name === "zipcode") {
      error = !validZipCode(value) ? "Invalid zip code" : "";
    } else if (name === "email") {
      error = !validEmail(value) ? "Invalid email" : "";
    } else if (name === "street") {
      error = !validStreet(value) ? "Invalid street" : "";
    }
    setContactData((prevData) => ({
      ...prevData,
      [name]: name === "zipCode" ? Number(value) : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmitForm = async (e, stage) => {
    e.preventDefault();
    setSubmitModalOpen(true);
    setStage(stage);
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
        const data = await response.json();
        if (data.length === 0) {
          setOpen(true);
        }
        setContacts(data);
        setAlertMessage({
          msg: "success",
          color: "#2D7D32",
        });
      }
    } catch (error) {
      setAlertMessage({
        msg: `${error}`,
        color: "red",
      });
      console.log("Error=>", error);
    } finally {
      setTimeout(() => {
        setAlertMessage({
          msg: "",
          color: "",
        });
      }, 5000);
    }
  };

  const onChangeToggle = (e, id, row) => {
    setIsEditContactToggle(e.target.checked);
    setToggleId(id);
    setContactData(
      Object.keys(row.values).length > 0 && e.target.checked
        ? row?.values
        : {
            firstname: "",
            lastname: "",
            country: "",
            city: "",
            street: "",
            zipcode: "",
            email: "",
            phone: "",
          }
    );
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCloseModal = () => setSubmitModalOpen(false);

  const submitFormBtn = async (e, answer) => {
    handleCloseModal(false);
    if (answer === "no") {
      return;
    }
    let editable = true;
    const options = {
      method: stage === "edit" ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        stage === "edit"
          ? { ...contactData, id: Number(toggleId) }
          : contactData
      ),
    };
    const formIsValid = Object.values(errors).every((error) => {
      return error === "";
    });
    const stateIsNotEmpty = Object.values(contactData).some((contact) => {
      return contact === "";
    });

    if (formIsValid && !stateIsNotEmpty) {
      setIsSubmitForm(true);
      if (stage === "edit") {
        const filterContact = contacts.filter(
          (contact) => contact.id === toggleId
        );
        for (const obj of filterContact) {
          for (const key in contactData) {
            if (obj[key] !== contactData[key]) {
              editable = false;
            }
          }
        }
        if (editable) {
          setAlertMessage({
            msg: "No change",
            color: "#2D7D32",
          });
          setIsSubmitForm(false);
          setIsEditContactToggle(false);
          setTimeout(() => {
            setAlertMessage({
              msg: "",
              color: "",
            });
          }, 5000);
        }
      }
      try {
        const response = await fetch(
          `/api/${stage === "edit" ? "edit" : "create"}`,
          options
        );
        if (response.status !== 200) {
          const errorResponse = await response.json();
          setAlertMessage({
            msg: `${errorResponse.errors[0].type}-EMAIL`,
            color: "red",
          });
          throw new Error("Something went wrong");
        }
        if (!editable) {
          setIsSubmitForm(false);
        }
        const _contacts = await response.json();
        setContacts(_contacts);
        setAlertMessage({
          msg: "success",
          color: "#2D7D32",
        });
        setContactData({
          firstname: "",
          lastname: "",
          country: "",
          city: "",
          street: "",
          zipcode: "",
          email: "",
          phone: "",
        });
      } catch (error) {
        console.log("Error=>", error);
      } finally {
        setIsSubmitForm(false);
        setIsEditContactToggle(false);
        setTimeout(() => {
          setAlertMessage({
            msg: "",
            color: "",
          });
        }, 5000);
      }
    } else {
      setAlertMessage({
        msg: "Please fill the form",
        color: "red",
      });
      setTimeout(() => {
        setAlertMessage({
          msg: "",
          color: "",
        });
      }, 5000);
    }
  };

  return (
    <>
      <AlertMessage text={alertMessage.msg} color={alertMessage.color} />
      <ContactDashboardStyle>
        <ContacDashboardCard mobile={mobile ? 1 : 0}>
          <div className="dashboard_header">
            {" "}
            <h4>Create new contact</h4>
            <Button variant="contained" className="export_csv">
              <CSVLink
                className="downloadbtn"
                filename="claims-conference.csv"
                data={csvData(contacts)}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </div>
          <FormStyle>
            <Form
              isEditContactToggle={isEditContactToggle}
              isSubmitForm={isSubmitForm}
              handleSubmitForm={handleSubmitForm}
              contactData={contactData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          </FormStyle>

          {open ? (
            <ModalMessage
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          ) : (
            <TableStyle>
              <ContactsTable
                isEditContactToggle={isEditContactToggle}
                onChangeToggle={onChangeToggle}
                contacts={contacts}
                isLoading={isLoading}
                handleRemove={handleRemove}
              />
            </TableStyle>
          )}
        </ContacDashboardCard>
      </ContactDashboardStyle>
      {isSubmitModalOpen && (
        <ModalMessage
          open={isSubmitModalOpen}
          handleClose={handleCloseModal}
          submitFormBtn={submitFormBtn}
          flag={true}
          message={"Are you sure you want to submit/edit the form?"}
        />
      )}
    </>
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
    &:hover {
      background-color: #010101;
    }
    a {
      color: white;
      font-size: ${(props) => (props.mobile ? "10px" : "13px")};
      font-family: "Roboto Flex", sans-serif;
      text-transform: none;
      text-decoration: none;
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
