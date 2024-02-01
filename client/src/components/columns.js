import { formatFirstLetterToUpperCase } from "../utils/index";
import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "First Name",
    accessor: "firstname",
    Cell: ({ value }) => {
      return formatFirstLetterToUpperCase(value);
    },
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    accessor: "lastname",
    Cell: ({ value }) => {
      return formatFirstLetterToUpperCase(value);
    },
    Filter: ColumnFilter,
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => {
      return formatFirstLetterToUpperCase(value);
    },
    disableFilters: true,
  },
  {
    Header: "City",
    accessor: "city",
    Cell: ({ value }) => {
      return formatFirstLetterToUpperCase(value);
    },
    disableFilters: true,
  },
  {
    Header: "Street",
    accessor: "street",
    Cell: ({ value }) => {
      return formatFirstLetterToUpperCase(value);
    },
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Zip Code",
    accessor: "zipcode",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Phone Number",
    accessor: "phone",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Email",
    accessor: "email",
    disableFilters: true,
    disableSortBy: true,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      { Header: "First Name", Footer: "First Name", accessor: "firstname" },
      { Header: "Last Name", Footer: "Last Name", accessor: "lastname" },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      { Header: "Country", Footer: "Country", accessor: "country" },
      { Header: "City", Footer: "City", accessor: "city" },
      { Header: "Street", Footer: "Street", accessor: "street" },
      { Header: "Zip Code", Footer: "Zip Code", accessor: "zipcode" },
      { Header: "Phone Number", Footer: "Phone Number", accessor: "phone" },
      { Header: "Email", Footer: "Email", accessor: "email" },
    ],
  },
];
