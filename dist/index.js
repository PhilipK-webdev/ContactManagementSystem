"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
const routes_1 = __importDefault(require("./api/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
models_1.default.sequelize
    .sync()
    .then(function () {
    app.listen(PORT, function () {
        console.log(`App listening at http://localhost:${PORT}`);
    });
})
    .catch((err) => console.log(err));
exports.default = app;
//# sourceMappingURL=index.js.map