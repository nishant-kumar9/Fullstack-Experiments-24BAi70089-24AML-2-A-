import React from "react";

function SearchBook({ search, setSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="🔍 Search Book..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBook;