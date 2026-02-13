import { useState } from "react";
import "./Library.css";

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const addBook = () => {
    if (!title.trim() || !author.trim()) return;

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim()
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

 
  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Library Management System</h1>

      {/* Search Input */}
      <input
        className="search"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Book Form */}
      <div className="form">
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book List */}
      {filteredBooks.map((book) => (
        <div key={book.id} className="book">
          <div>
            <h2>{book.title}</h2>
            <p>by {book.author}</p>
          </div>

          <button
            className="remove"
            onClick={() => removeBook(book.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
