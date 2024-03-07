import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const port = 8080;

const app = express();
app.use(express.json());

app.get("/resumes", async (req, res) => {
  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(allResumes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/resumes/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).send(resume);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/resumes", async (req, res) => {
  try {
    const resume = await prisma.resume.create({
      data: {
        resume: req.body,
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

app.patch("/resumes/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.update({
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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/resumes/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.delete({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .send({ message: `Successfully deleted resume`, id: resume.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
