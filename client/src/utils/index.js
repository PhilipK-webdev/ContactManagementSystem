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
