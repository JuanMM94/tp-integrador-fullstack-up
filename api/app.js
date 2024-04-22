require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { MONGO_URI, PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const plushiesRoutes = require("./routes/plushies");

app.use("/api", usersRoutes);
app.use("/api", authRoutes);
app.use("/api", plushiesRoutes);

try {
  mongoose.connect(MONGO_URI);
  console.log("Connected to the Database");
} catch (error) {
  throw new Error(error.message);
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
