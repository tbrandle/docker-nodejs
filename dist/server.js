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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const port = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/resumes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allResumes = yield prisma.resume.findMany();
        res.status(200).send(allResumes);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.get("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.findUnique({
            where: { id: req.params.id },
        });
        res.status(200).send(resume);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.post("/resumes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.create({
            data: {
                resume: req.body,
            },
        });
        res
            .status(200)
            .send({ message: `Successfully added resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.patch("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.update({
            data: {
                resume: req.body,
            },
            where: {
                id: req.params.id,
            },
        });
        res
            .status(200)
            .send({ message: `Successfully updated resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.delete("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.delete({
            where: {
                id: req.params.id,
            },
        });
        res
            .status(200)
            .send({ message: `Successfully deleted resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.listen(port, () => console.log(`Server has started on port ${port}`));
