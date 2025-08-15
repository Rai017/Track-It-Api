const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  seats: { type: Number, required: true, default: 0 }, // total seats
  bookedSeats: { type: [Number], default: [] }         // booked seats
});

module.exports = mongoose.model('Event', eventSchema);
