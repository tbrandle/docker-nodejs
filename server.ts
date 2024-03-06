import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
    this.app.use(express.json());
  }

  protected routes(): void {
    this.app.route("/").get(async (req, res) => {
      try {
        const allResumes = await prisma.resume.findMany({
          include: {
            personal_details: {
              include: {
                fields: true,
              },
            },
          },
        });
        res.status(200).send(allResumes);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    this.app.get("/", async (req, res) => {
      try {
        const allResumes = await prisma.resume.findMany({
          include: {
            personal_details: {
              include: {
                fields: true,
              },
            },
          },
        });
        res.status(200).send(allResumes);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    this.app.get("/:id", async (req, res) => {
      try {
        const resume = await prisma.resume.findUnique({
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
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    this.app.post("/resume", async (req, res) => {
      console.log("req.body", req.body);
      const {
        resume_title,
        social_media,
        skills,
        employment_history,
        education,
        personal_details,
      } = req.body;

      try {
        const resume = await prisma.resume.create({
          data: {
            resume_title,
            social_media,
            skills,
            employment_history,
            education,
            personal_details: {
              create: {
                ...personal_details,
                fields: {
                  createMany: {
                    data: personal_details.fields,
                  },
                },
              },
            },
          },
        });
        res
          .status(200)
          .send({ message: `Successfully added resume`, id: resume.id });
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }
}

const port = 8080;

const app = new App().app;
app.listen(port, () => console.log(`Server has started on port ${port}`));
