const express = require("express");
const { body } = require('express-validator');
const router = express.Router();

const authController = require("../controllers/auth-controller");

router.get("/", authController.getUsers);

router.post('/signup', [
    body('name').isLength({ min: 3 }).withMessage('Please enter a name of at least 3 characters long'),
    body('email').normalizeEmail().isEmail().withMessage('Please enter a valid E-Mail address')
], authController.signUp);

router.post('/login', authController.login);

module.exports = router;
