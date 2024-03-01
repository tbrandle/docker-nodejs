const express = require("express");
const pool = require("./db");
const port = 8080;

const app = express();
app.use(express.json());

// routes
app.get("/", async (req, res) => {
  // try {
  //   const data = await pool.query("SELECT * FROM resumes");
  //   res.status(200).send(data.rows);
  // } catch (error) {
  //   console.log(err);
  //   res.sendStatus(500);
  // }
  res.status(200).send({ message: "GREAT" });
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO resumes (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send({ message: "Successfully added resume" });
  } catch (error) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE resumes( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
  } catch (error) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
