

import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
import app from './app';  
// import { createClient } from 'redis'; // Uncomment if using Redis

// Determine the port from environment or use a default
const PORT = process.env.PORT || 5000;

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Initialize Socket.IO server on top of the HTTP server
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: '*',  // Allow all origins (configure this in production!)
//   },
// });

// Handle incoming Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('Client connected:', socket.id);

//   // Example: Emit a welcome event to the connected client
//   socket.emit('welcome', 'Welcome to the server!');

//   // Handle client disconnection
//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });

//   // (Add more event handlers here as needed, e.g. socket.on('myEvent', handler))
// });

// (Optional) Redis Pub/Sub setup
/*
(async () => {
  try {
    // Create a Redis client (configure URL and options as needed)
    const redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis error:', err));
    await redisClient.connect();

    // Subscribe to a Redis channel (e.g., 'products')
    await redisClient.subscribe('products', (message: string) => {
      console.log('Received product message from Redis:', message);
      // Forward the message to all connected Socket.IO clients
      io.emit('productStatusUpdate', message);
    });
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();
*/

// Start listening for HTTP requests
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
