const Event = require('../models/Event');

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, date, totalSeats } = req.body;

    // Create event with seats and bookedSeats initialized
    const event = await Event.create({
      title,
      date,
      seats: totalSeats ? parseInt(totalSeats) : 0,
      bookedSeats: []
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ error: "Error creating event: " + err.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent, getEvents };
