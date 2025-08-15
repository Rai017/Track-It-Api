const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware'); 

// Only logged-in users can create events
router.post('/', protect, eventController.createEvent);

// Get all events (open for everyone)
router.get('/', eventController.getEvents);

module.exports = router;
