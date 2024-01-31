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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
const router = express_1.default.Router();
router.get("/contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield models_1.default.User.findAll();
        res.json(contacts);
    }
    catch (error) {
        console.error("GET route - Error:", error);
        res.status(500).send("Internal Server Error");
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, country, city, street, zipcode, phone, email, } = req.body;
        yield models_1.default.User.create({
            firstname,
            lastname,
            country,
            city,
            street,
            zipcode,
            phone,
            email,
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.error("CREATE route - Error:", error);
        res.status(500).send("Internal Server Error");
    }
}));
router.put("/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
        const contacts = yield models_1.default.User.findAll();
        const contactExists = contacts.some((contact) => contact.id === id);
        if (!contactExists) {
            return res.status(400).send("invalid user id");
        }
        yield models_1.default.User.update(Object.assign({}, data), {
            where: {
                id: id,
            },
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.error("EDIT route - Error:", error);
        res.status(500).send("Internal Server Error");
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacts = yield models_1.default.User.findAll();
        const contactExists = contacts.some((contact) => contact.id === id);
        if (!contactExists) {
            return res.status(400).send("Id not found");
        }
        yield models_1.default.User.destroy({
            where: {
                id,
            },
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.error("DELETE route - Error:", error);
        res.status(500).send("Internal Server Error");
    }
}));
module.exports = router;
//# sourceMappingURL=routes.js.map