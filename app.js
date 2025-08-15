const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http=require("http");
const socketIO=require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*', methods: ['GET','POST'] } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('seat-selected', (data) => io.emit('seat-locked', data));
  socket.on('seat-unselected', (data) => io.emit('seat-unlocked', data));
  socket.on('booking-confirmed', (data) => io.emit('update-bookings', data));

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT);
