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
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.route("/").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allResumes = yield prisma.resume.findMany({
                    include: {
                        personal_details: {
                            include: {
                                fields: true,
                            },
                        },
                    },
                });
                res.status(200).send(allResumes);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }));
        this.app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allResumes = yield prisma.resume.findMany({
                    include: {
                        personal_details: {
                            include: {
                                fields: true,
                            },
                        },
                    },
                });
                res.status(200).send(allResumes);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }));
        this.app.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resume = yield prisma.resume.findUnique({
                    where: { id: req.params.id },
                    include: {
                        personal_details: {
                            include: {
                                fields: true
                            },
                        },
                    },
                });
                res.status(200).send(resume);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }));
        this.app.post("/resume", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("req.body", req.body);
            const { resume_title, social_media, skills, employment_history, education, personal_details, } = req.body;
            try {
                const resume = yield prisma.resume.create({
                    data: {
                        resume_title,
                        social_media,
                        skills,
                        employment_history,
                        education,
                        personal_details: {
                            create: Object.assign(Object.assign({}, personal_details), { fields: {
                                    createMany: {
                                        data: personal_details.fields,
                                    },
                                } }),
                        },
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
    }
}
const port = 8080;
const app = new App().app;
app.listen(port, () => console.log(`Server has started on port ${port}`));
