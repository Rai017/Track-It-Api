const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require("http");
const socketIO = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const server = http.createServer(app);

// ---------- CORS Middleware ----------
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://charming-boba-2d15b9.netlify.app",
    "https://cool-kulfi-1356ca.netlify.app",
    "https://marvelous-moonbeam-e82428.netlify.app",
    "https://joyful-churros-5c045d.netlify.app",
    "https://animated-crumble-742d62.netlify.app",
    "https://majestic-marshmallow-e9a9be.app"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);


const io = socketIO(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://charming-boba-2d15b9.netlify.app",
      "https://cool-kulfi-1356ca.netlify.app",
      "https://marvelous-moonbeam-e82428.netlify.app",
      "https://joyful-churros-5c045d.netlify.app",
      "https://animated-crumble-742d62.netlify.app",
      "https://majestic-marshmallow-e9a9be.netlify.app"
    ],
    methods: ["GET","POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('seat-selected', (data) => io.emit('seat-locked', data));
  socket.on('seat-unselected', (data) => io.emit('seat-unlocked', data));
  socket.on('booking-confirmed', (data) => io.emit('update-bookings', data));

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop server if DB not connected
  });

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
