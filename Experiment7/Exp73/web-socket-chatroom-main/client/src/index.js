// This import brings in React itself.
// We need React because the application is built using React components.
// Without this library, the browser would not understand the component-based code we write below.
import React from "react";

// This import brings in the tool that connects our React app to the real web page.
// We use ReactDOM to tell React where to display the application inside the HTML file.
// In this project, it will render everything inside the div with id="root".
import ReactDOM from "react-dom/client";

// This import brings in the main App component.
// We keep the chat interface inside App so the project has a clear starting point for students.
// This also follows the common React curriculum pattern of rendering one top-level App component.
import App from "./App";

// This import loads the global CSS file.
// We use it to apply shared page styles like background, font, and box sizing.
// Importing CSS inside JavaScript is normal in React projects because it keeps styles connected to the app.
import "./index.css";

// This line finds the root HTML element from public/index.html.
// React needs one real DOM element where it can mount the whole application.
// The element is the div with id="root" inside the public HTML file.
const root = ReactDOM.createRoot(document.getElementById("root"));

// This block tells React to render the App component inside the root element.
// We wrap App with React.StrictMode because it helps catch common problems during development.
// Students often see this exact pattern in React classes and starter projects.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
