import axios from "axios";
import { useState } from "react";

function SearchDocument() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/search?q=${query}`);
    setResult(res.data);
  };

  return (
    <div>
      <h3>Search Document</h3>
      <input
        type="text"
        placeholder="Enter keyword..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {result.map((doc) => (
          <li key={doc._id}>{doc.filename}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchDocument;
