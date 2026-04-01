// This line imports the Express library.
// We use Express to create a simple backend server in Node.js.
// Express makes routing and server setup easier for beginners.
import express from "express";

// This line imports Node's built-in HTTP module.
// Socket.io needs access to the raw HTTP server so it can attach WebSocket functionality.
// That is why we create an HTTP server manually instead of only calling app.listen().
import http from "http";

// This line imports the CORS middleware.
// We use CORS because the React client and Node server run on different ports.
// Without it, the browser may block communication between the frontend and backend.
import cors from "cors";

// This line imports the Server class from Socket.io.
// We use it to create a real-time communication server on top of the HTTP server.
// This is the part that powers instant message delivery.
import { Server } from "socket.io";

// This line creates the Express application object.
// The app object lets us register middleware and routes.
// Think of it as the main backend app.
const app = express();

// This line creates a plain HTTP server using the Express app.
// Socket.io will attach to this server so both HTTP requests and WebSocket connections share the same port.
// This is a very common pattern in real-time Node applications.
const server = http.createServer(app);

// This middleware allows requests from the React client.
// The frontend runs on localhost:3000, so we allow that origin explicitly.
// This keeps the server open only to the expected development client.
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// This block creates the Socket.io server.
// We attach it to the HTTP server so Socket.io can handle real-time client connections.
// The CORS settings here also allow the React app to open the socket connection from port 3000.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// This route is a simple test route for the browser.
// If someone opens the backend URL directly, they will see a short message.
// It helps confirm that the Express server is running.
app.get("/", (req, res) => {
  res.send("Socket.io chat server is running.");
});

// This block runs every time a new user connects through Socket.io.
// The socket object represents one connected client.
// We use it to listen for events from that user and send messages back.
io.on("connection", (socket) => {
  // This log helps us see when a user connects.
  // Each socket has a unique id, which is useful for debugging.
  // Server console logs are often the fastest way to inspect real-time activity.
  console.log(`User connected: ${socket.id}`);

  // This listener waits for the client to emit the "join_chat" event.
  // The client sends the username so the server knows who has joined.
  // We then inform other users that someone entered the chat.
  socket.on("join_chat", (username) => {
    // This line sends a join message to every other connected client except the one who just joined.
    // We use socket.broadcast.emit because it excludes the current socket.
    // That creates a nice "System" notification for the rest of the room.
    socket.broadcast.emit("receive_message", {
      username: "System",
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString(),
    });
  });

  // This listener waits for an actual chat message from the client.
  // The messageData object contains the username, text, and time.
  // Once received, we send it to every connected client.
  socket.on("send_message", (messageData) => {
    // This emits the message to all users, including the sender.
    // Sending it back to everyone keeps all chat windows synchronized.
    // That means the sender sees the same final message object as everyone else.
    io.emit("receive_message", messageData);
  });

  // This listener runs when the user disconnects.
  // Disconnects happen when a tab closes, refreshes, or loses connection.
  // Logging this event is helpful while testing.
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// This constant stores the port number used by the backend server.
// Keeping it in one variable makes it easy to change later.
// Port 5000 is common for a local API or socket server in tutorials.
const PORT = 5000;

// This starts the HTTP server and also activates the attached Socket.io server.
// Once this runs, the backend begins listening for both browser requests and socket connections.
// The callback simply prints a message so we know the server started successfully.
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
