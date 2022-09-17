const express = require('express');
const storeController = require('../controllers/store-controller');
const { body } = require('express-validator');
const checkToken = require('../middleware/token');
const router = express.Router();

router.get('/', storeController.getMerchs);
router.post('/', [
    body('name').isLength({ min: 3 }).withMessage('Please enter a valid name for your product'),
    body('price').isLength({ min: 1 }).withMessage('Please enter a price for your product')
], checkToken, storeController.createMerch);

module.exports = router;