
const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, date, seats } = req.body;
    const event = await Event.create({ title, date, seats });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent, getEvents };
