"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_table_1 = require("react-table");
const columns_1 = require("./columns");
require("./table.css");
const BasicTable = () => {
    const [contacts, setContacts] = (0, react_1.useState)([]);
    const columns = (0, react_1.useMemo)(() => columns_1.GROUPED_COLUMNS, []);
    const data = (0, react_1.useMemo)(() => contacts, [contacts]);
    const { getTableProps, getTableBodyProps, footerGroups, headerGroups, rows, prepareRow, } = (0, react_table_1.useTable)({ columns, data });
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
    return (<table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (<tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, colIndex) => (<th {...column.getHeaderProps()} key={colIndex}>
                {column.render("Header")}
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
    </table>);
};
exports.default = BasicTable;
