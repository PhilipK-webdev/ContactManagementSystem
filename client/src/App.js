"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const FilteringTable_1 = __importDefault(require("./components/FilteringTable"));
// import SortingTable from "./components/SortingTable";
// import BasicTable from "./components/BasicTable";
function App() {
    return (<div>
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      <FilteringTable_1.default />
    </div>);
}
exports.default = App;
