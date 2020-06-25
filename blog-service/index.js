const express = require("express");
const cors = require("cors");
require("dotenv").config();
const blogRoutes = require("./routes");
const mongoose = require("mongoose");

const port = process.env.BLOG_SERVICE_PORT;
const url = process.env.BLOG_DB_URL;

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("---Error connecting to blog db");
    } else {
      console.log("---Successfully connected to blog db");
    }
  }
);

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", blogRoutes);

app.listen(port, () => {
  console.log(`Blog service is listening on port ${port}`);
});
