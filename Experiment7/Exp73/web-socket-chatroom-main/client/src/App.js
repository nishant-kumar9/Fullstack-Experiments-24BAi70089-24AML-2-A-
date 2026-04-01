import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const chatEndRef = useRef(null);

  // 🔁 SOCKET LISTENERS
  useEffect(() => {
    socket.on("users_list", (userList) => {
      setUsers(userList);
    });

    socket.on("receive_message", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socket.on("typing", (user) => {
      if (user !== username) {
        setTypingUser(user);

        setTimeout(() => {
          setTypingUser("");
        }, 1500);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("users_list");
      socket.off("typing");
    };
  }, [username]);

  // 🔄 AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 👤 JOIN CHAT
  function joinChat() {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    socket.emit("join_chat", username);
    setJoined(true);
  }

  // ✉️ SEND MESSAGE
  function sendMessage() {
    if (!message.trim() || !joined) return;

    const messageData = {
      username,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);
    setMessage("");
  }

  // ⌨️ TYPING EVENT
  function handleTyping(e) {
    setMessage(e.target.value);
    socket.emit("typing", username);
  }

  return (
    <div className="chat-app">
      <div className="chat-card">
        <h1>Real-Time Chat</h1>
        <p className="subtitle">
          React client with a Node and Express Socket.io server
        </p>

        {/* JOIN SECTION */}
        <div className="join-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={joined}
          />
          <button onClick={joinChat} disabled={joined}>
            Join Chat
          </button>
        </div>

        {joined && (
          <div className="chat-section">
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h3>Chat Room</h3>
              <p>
                Online: {users.length} {users.join(", ")}
              </p>
            </div>

            {/* CHAT BOX */}
            <div className="chat-box">
              {messages.map((chatMessage, index) => (
                <div
                  key={index}
                  className={
                    chatMessage.type === "system"
                      ? "message system-message"
                      : chatMessage.username === username
                      ? "message own-message"
                      : "message"
                  }
                >
                  {chatMessage.type !== "system" && (
                    <div className="message-header">
                      <span className="message-user">
                        {chatMessage.username}
                      </span>
                      <span className="message-time">
                        {chatMessage.time}
                      </span>
                    </div>
                  )}

                  <p className="message-text">{chatMessage.text}</p>
                </div>
              ))}

              <div ref={chatEndRef}></div>
            </div>

            {/* TYPING INDICATOR */}
            {typingUser && (
              <p style={{ fontStyle: "italic", marginTop: "5px" }}>
                {typingUser} is typing...
              </p>
            )}

            {/* INPUT */}
            <div className="message-section">
              <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
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

export default App;