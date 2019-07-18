const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const mongoURI = "mongodb://localhost/app-db";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use("/api", require("./router/api"));

app.listen(4000, () => {
  console.log("Server is listening");
});
