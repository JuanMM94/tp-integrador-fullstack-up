require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { MONGO_URI, PORT } = process.env;

const app = express();
app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use("/api", usersRoutes);
app.use("/api", authRoutes);

try {
  mongoose.connect(MONGO_URI);
  console.log("%s Connected to the Database");
} catch (error) {
  throw new Error(error.message);
}

app.listen(PORT, () => console.log(`%s Listening to port ${PORT}`));
