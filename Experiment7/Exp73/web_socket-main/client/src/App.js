// This import brings in the useEffect hook.
// We use useEffect to set up and clean up the Socket.io event listener when the component loads.
// This is important because event listeners should not keep getting attached every time the component re-renders.
import { useEffect } from "react";

// This import brings in the useState hook.
// We use useState to store data that changes while the user interacts with the chat app.
// In this file, it helps us track the username, join status, typed message, and chat history.
import { useState } from "react";

// This import brings in the Socket.io client function.
// We use it to create a WebSocket-based connection from the React frontend to the Node/Express server.
// This is what makes the chat real-time instead of requiring page refreshes.
import { io } from "socket.io-client";

// This import loads the styles that are specific to the App component.
// We separate these styles from index.css so students can see the difference between global styles and component page styles.
// This also keeps the project more organized.
import "./App.css";

// This line creates one socket connection to the backend server.
// We place it outside the App component so the connection is created once and can be reused.
// The URL points to the Express server that is running Socket.io on port 5000.
const socket = io("http://localhost:5000");

// This function component is the main chat screen of the React application.
// React components return JSX, which looks like HTML but is actually JavaScript syntax for UI.
// Everything the user sees in the browser is controlled from this component.
function App() {
  // This state stores the name the user types before joining the chat.
  // We need it so we know who is sending each message.
  // The empty string means the input starts blank.
  const [username, setUsername] = useState("");

  // This state tracks whether the user has joined the chat room yet.
  // We use it to decide when to show the message area.
  // The initial value is false because the user has not joined when the page first opens.
  const [joined, setJoined] = useState(false);

  // This state stores the current message being typed in the input box.
  // It keeps the input controlled by React, which is the standard pattern taught in React basics.
  // The value updates every time the user types.
  const [message, setMessage] = useState("");

  // This state stores all chat messages received so far.
  // We use an array because chat messages come as a list over time.
  // Every new incoming message is added to the end of this array.
  const [messages, setMessages] = useState([]);

  // This effect runs once when the component is first shown on the page.
  // We use it to listen for messages that come from the Socket.io server.
  // The empty dependency array means this setup happens one time when the component mounts.
  useEffect(() => {
    // This listener waits for the server to send a "receive_message" event.
    // When that event arrives, we add the new message to the existing list of messages.
    // We use the callback form of setMessages so we always work with the latest state value.
    socket.on("receive_message", (messageData) => {
      setMessages((currentMessages) => [...currentMessages, messageData]);
    });

    // This cleanup function runs when the component is removed.
    // We remove the listener so we do not accidentally register duplicate listeners later.
    // Cleaning up listeners is an important habit in real-time apps.
    return () => {
      socket.off("receive_message");
    };
  }, []);

  // This function runs when the user clicks the Join Chat button.
  // Its job is to validate the username, notify the server, and unlock the chat area.
  // Keeping this logic in a named function makes the event handling easier to read and explain.
  function joinChat() {
    // This check prevents empty usernames from being accepted.
    // We use trim() so names containing only spaces are also rejected.
    // This improves the user experience and keeps the chat cleaner.
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    // This line tells the server that a user has joined the chat.
    // The server can then notify other connected users in real time.
    // We send the username so the server knows who joined.
    socket.emit("join_chat", username);

    // This line updates the interface so the chat area becomes visible.
    // Once the student joins, they can start typing and sending messages.
    // React will automatically re-render the UI after this state change.
    setJoined(true);
  }

  // This function runs when the user sends a message.
  // It packages the username, text, and time into one object.
  // That object is then emitted to the server so every connected client can receive it.
  function sendMessage() {
    // This guard stops empty messages from being sent.
    // It also prevents sending messages before the user has joined the chat.
    // These checks avoid invalid app states.
    if (!message.trim() || !joined) {
      return;
    }

    // This object represents one chat message.
    // It contains the sender name, the actual text, and the current time for display.
    // Structuring data like this makes it easier to send and render consistently.
    const messageData = {
      username: username,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    // This line sends the message to the Socket.io server.
    // The server then broadcasts it back to all connected users.
    // That includes the sender, so everyone stays in sync.
    socket.emit("send_message", messageData);

    // This line clears the message input after sending.
    // It gives the user immediate feedback that the message was submitted.
    // Controlled inputs in React are cleared by updating state.
    setMessage("");
  }

  // This returned JSX describes the chat interface.
  // React reads this structure and renders matching HTML elements in the browser.
  // The UI is split into a join area and a chat area so the flow is easy for students to understand.
  return (
    <div className="chat-app">
      <div className="chat-card">
        <h1>Real-Time Chat</h1>
        <p className="subtitle">
          React client with a Node and Express Socket.io server
        </p>

        <div className="join-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={joined}
          />
          <button onClick={joinChat} disabled={joined}>
            Join Chat
          </button>
        </div>

        {joined && (
          <div className="chat-section">
            <div className="chat-box">
              {messages.map((chatMessage, index) => (
                <div
                  key={`${chatMessage.time}-${index}`}
                  className={
                    chatMessage.username === username
                      ? "message own-message"
                      : "message"
                  }
                >
                  <div className="message-header">
                    <span className="message-user">{chatMessage.username}</span>
                    <span className="message-time">{chatMessage.time}</span>
                  </div>
                  <p className="message-text">{chatMessage.text}</p>
                </div>
              ))}
            </div>

            <div className="message-section">
              <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// This export makes the App component available to other files.
// We export it so src/index.js can import and render it.
// Exporting components is a basic React pattern students will use often.
export default App;
