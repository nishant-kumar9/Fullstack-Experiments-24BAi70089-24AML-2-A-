import React, { useState } from "react";
import AddBook from "./components/AddBook";
import SearchBook from "./components/SearchBook";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const addBook = (title) => {
    setBooks([...books, title]);
  };

  const removeBook = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const filteredBooks = books.filter((book) =>
    book.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📚Library Management System</h1>

      <SearchBook search={search} setSearch={setSearch} />

      <AddBook addBook={addBook} />

      <BookList books={filteredBooks} removeBook={removeBook} />
    </div>
  );
}

export default App;