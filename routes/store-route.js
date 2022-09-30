const express = require('express');
const storeController = require('../controllers/store-controller');
const { body } = require('express-validator');
const checkToken = require('../middleware/token');
const router = express.Router();

router.get('/merch', storeController.getMerchs);
router.get('/event', storeController.getEvents);

router.post('/merch', [
    body('name').isLength({ min: 3 }).withMessage('Please enter a valid name for your product'),
    body('price').isLength({ min: 1 }).withMessage('Please enter a price for your product')
], checkToken, storeController.createMerch);

router.post('/event', [
    body('name').isLength({ min: 3 }).withMessage('Please enter the name of your event'),
    body('venue').isLength({ min: 3 }).withMessage('Please enter the venue of your event'),
    body('dayMonth').isLength({ min: 5 }).withMessage('Please enter a date for your event')
], storeController.addEvent);

router.delete('/event/:eventId', storeController.deleteEvent);

module.exports = router;