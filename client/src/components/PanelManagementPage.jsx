import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ContactDashboard from "./contact/ContactDashboard";

export const PanelManagementPage = () => {
  return (
    <>
      <Header />
      <ContactDashboard />
      <Footer />
    </>
  );
};
