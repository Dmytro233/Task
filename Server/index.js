const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const mongoURI = "mongodb://localhost/app_db";

// 2 step
mongoose
  .connect(process.env.MONGODB_URI || mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use("/api", require("./router/api"));

// 3 step
if (process.env.NODE_ENV === "production") {
  app.use(express.static("app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "app", "build", "index.html")); // relative path
  });
}

let port = process.env.PORT || 8000; // 1 step
app.listen(port);
