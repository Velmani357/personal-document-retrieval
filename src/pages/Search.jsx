import { useState } from "react";
import axios from "axios";
import "./Page.css";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/documents/search?keyword=${keyword}`
    );
    setResults(res.data);
  };

  return (
    <div className="page">
      <h1>🔍 Search Documents</h1>

      <input
        placeholder="Enter keyword"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="grid">
        {results.map(doc => (
          <div key={doc._id} className="card">
            <h3>{doc.filename}</h3>
            <button onClick={() => alert(doc.content)}>
              Open Document
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
