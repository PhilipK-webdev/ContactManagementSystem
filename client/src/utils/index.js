export const formatFirstLetterToUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validEmail = (str) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};
export const validTextField = (str) => {
  const textRegex = /^[a-zA-Z\s',-]+$/;
  return textRegex.test(str);
};
export const validStreet = (str) => {
  const streetRegex = /^[a-zA-Z0-9\s',-]+$/;
  return streetRegex.test(str);
};

export const validZipCode = (input) => {
  const zipCodeRegex = /^[0-9]+$/;
  return zipCodeRegex.test(input);
};

export const validPhoneNumber = (str) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(str);
};

export const csvData = (contacts) => {
  return [
    [
      "First Name",
      "Last Name",
      "Country",
      "City",
      "Street",
      "Zip Code",
      "Phone Number",
      "Email",
    ],
    ...contacts.map(
      ({
        firstname,
        lastname,
        country,
        city,
        street,
        zipcode,
        phone,
        email,
      }) => [firstname, lastname, country, city, street, zipcode, phone, email]
    ),
  ];
};
