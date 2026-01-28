import { useState } from "react";

function App() {
  const maxLength = 2000;
  const [text, setText] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
      }}
    >
      <div style={{ position: "relative", width: "900px" }}>
        <textarea
          style={{
            width: "100%",
            height: "300px",           
            padding: "20px",
            fontSize: "18px",
            backgroundColor: "white", 
            border: "1px solid #9ca3af",
            borderRadius: "8px",
            resize: "none",
            outline: "none",
          }}
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxLength}
        />

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "15px",
            color: "#4b5563",
            fontSize: "14px",
          }}
        >
          {text.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}

export default App;
