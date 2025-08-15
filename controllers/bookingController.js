const Booking = require('../models/Booking');
const Event = require('../models/Event');

const bookSeats = async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId, seats } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
const isBooked = seats.some(seat => event.bookedSeats.includes(seat));
    if (isBooked) return res.status(400).json({ error: 'One or more seats already booked' });

    // Update booked seats
    event.bookedSeats.push(...seats);
    await event.save();

    // Create booking
    const booking = await Booking.create({ user: userId, event: eventId, seats });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { bookSeats };