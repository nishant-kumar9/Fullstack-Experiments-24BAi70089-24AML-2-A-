import React from "react";

function BookList({ books, removeBook }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
          <span>{book}</span>
          <button onClick={() => removeBook(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;