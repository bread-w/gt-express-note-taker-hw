const express = require("express");
const path = require("path");
const fs = require("fs");
let db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  fs.writeFile("./db/db.json", JSON.stringify(), (err) => {
    if (err) {
      console.log("Oops! There's been an error saving your note!");
    }
    res.json(db);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`Currently running on http://localhost:${PORT}`);
});
