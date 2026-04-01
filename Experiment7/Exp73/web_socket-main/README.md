# Real-Time Chat with Socket.io

This project shows a beginner-friendly real-time chat app using WebSocket connections with Socket.io.

## Folder structure

- `server/` contains the Node.js + Express + Socket.io backend
- `client/` contains the React.js frontend using a standard React project structure

## Run the project

### 1. Install dependencies

In one terminal:

```bash
cd server
npm install
```

In another terminal:

```bash
cd client
npm install
```

### 2. Start the server

```bash
cd server
npm start
```

### 3. Start the React client

```bash
cd client
npm start
```

### 4. Open the app

Visit:

```text
http://localhost:3000
```

The Socket.io server runs on:

```text
http://localhost:5000
```

## Features

- Join the chat with a username
- Send and receive messages in real time
- React.js client in a separate folder
- Node.js + Express server in a separate folder
- Detailed comments that explain what, why, and how
- Basic UI for learning how Socket.io works
