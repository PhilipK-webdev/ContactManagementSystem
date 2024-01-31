"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_table_1 = require("react-table");
const columns_1 = require("./columns");
const GlobalFilter_1 = __importDefault(require("./GlobalFilter"));
require("./table.css");
const FilteringTable = () => {
    const [contacts, setContacts] = (0, react_1.useState)([]);
    const columns = (0, react_1.useMemo)(() => columns_1.COLUMNS, []);
    const data = (0, react_1.useMemo)(() => contacts, [contacts]);
    const { getTableProps, getTableBodyProps, footerGroups, headerGroups, rows, prepareRow, state, setGlobalFilter, } = (0, react_table_1.useTable)({ columns, data }, react_table_1.useFilters, react_table_1.useGlobalFilter);
    const { globalFilter } = state;
    (0, react_1.useEffect)(() => {
        const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch("/api/contacts");
                if (response.status === 200) {
                    const data = yield response.json();
                    setContacts(data);
                }
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
        });
        getAllContacts();
    }, []);
    return (<>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (<tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, colIndex) => (<th {...column.getHeaderProps()} key={colIndex}>
                  {column.render("Header")}
                  {console.log(column)}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>))}
            </tr>))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, indexRow) => {
            prepareRow(row);
            return (<tr {...row.getRowProps()} key={indexRow}>
                {row.cells.map((cell, indexCell) => {
                    return (<td key={indexCell} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>);
                })}
              </tr>);
        })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup, indexGroup) => {
            return (<tr key={indexGroup} {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column, indexFooter) => {
                    return (<td key={indexFooter} {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </td>);
                })}
              </tr>);
        })}
        </tfoot>
      </table>
    </>);
};
exports.default = FilteringTable;
