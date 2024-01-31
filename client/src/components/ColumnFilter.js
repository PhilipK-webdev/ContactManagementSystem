"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ColumnFilter = ({ column }) => {
    const { setFilter } = column;
    return (<span>
      Search: {""}
      <input value={column.filterValue || ""} onChange={(e) => setFilter(e.target.value)}/>
    </span>);
};
exports.default = ColumnFilter;
