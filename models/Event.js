const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  seats: { type: Number, required: true },
  bookedSeats: { type: [Number], default: [] } // Array of booked seat numbers
});

module.exports = mongoose.model('Event', eventSchema);
