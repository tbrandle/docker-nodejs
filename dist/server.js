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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const port = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.default.query("SELECT * FROM resumes");
        res.status(200).send(data.rows);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location } = req.body;
    try {
        yield db_1.default.query("INSERT INTO resumes (name, address) VALUES ($1, $2)", [
            name,
            location,
        ]);
        res.status(200).send({ message: "Successfully added resume" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.get("/setup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query("CREATE TABLE resumes( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))");
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.listen(port, () => console.log(`Server has started on port ${port}`));
