const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
app.use(cors());
app.use(express.json());
//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");

//app.use(express.urlencoded({ extended: false }));

app.use("/notes", notesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
