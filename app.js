const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const HttpError = require("./models/http-error");
const mainRoute = require("./routes/main-route");
const authRoute = require("./routes/auth-route");
const storeRoute = require("./routes/store-route");
const keys = require("./private/keys");

const app = express();

const mongoUrl = `mongodb+srv://topboy-nation:${keys.mongoPassword}@topboy-nation.7jlovyk.mongodb.net/topboy?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public", "images")));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single(
  "image"
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(upload);

app.use(mainRoute);
app.use("/auth", authRoute);
app.use("/store", storeRoute);

app.use((req, res, next) => {
  throw new HttpError(
    "The page you are looking for is not found, null",
    null,
    404
  );
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error has occured!",
    content: error.content || null,
  });
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => {
    console.log(err);
  });
