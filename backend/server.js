const express = require("express");
require("dotenv").config();
const cors = require("cors");
const search = require("./src/search");

const app = express();
const port = process.env.BACKEND_PORT || 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const results = await search(q);
    res.json(results);
  } catch (error) {
    console.error("Aconteceu um erro: ", error);
    res.status(500).json({ error: "Erro ao realizar a pesquisa" });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
