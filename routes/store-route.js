const express = require('express');
const storeController = require('../controllers/store-controller');
const { body } = require('express-validator');
const checkToken = require('../middleware/token');
const imageUpload = require('../middleware/image-upload');
const rewriter = require('../middleware/rewriter');

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
    body('dayMonth').isLength({ min: 3 }).withMessage('Please enter a date for your event')
], storeController.addEvent);

router.post('/event/image/:eventId', imageUpload.single('image'), rewriter, storeController.addEventImage);

router.post('/mix/audio', storeController.addAudioMix);

router.delete('/event/:eventId', storeController.deleteEvent);

module.exports = router;