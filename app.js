const express = require("express");
require("express-async-errors");

const app = express();
const router = require("./routes/index");

require("dotenv").config();
const cors = require("cors");

//server middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

//db connection
const dbConnection = require("./db/connect");
dbConnection();

//setting base route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(5000, () => {
  console.log("App is listening at port 5000...");
});
