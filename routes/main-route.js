const express = require("express");

const mainController = require("../controllers/main-controller");

const router = express.Router();

router.get("/", mainController.main);

router.get("/mail", mainController.sendMail);

module.exports = router;
