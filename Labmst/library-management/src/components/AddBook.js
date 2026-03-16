import React, { useState } from "react";

function AddBook({ addBook }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addBook(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter Book Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;