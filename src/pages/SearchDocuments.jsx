import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaShareAlt } from "react-icons/fa";

export default function SearchDocuments() {
  const [keyword, setKeyword] = useState("");
  const [docs, setDocs] = useState([]);

  // LOAD ALL DOCS INITIALLY
  const fetchDocs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      setDocs(res.data);
    } catch (err) {
      console.log("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // SEARCH
  const handleSearch = async () => {
    if (!keyword) {
      fetchDocs(); // show all again
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/documents/search?keyword=${keyword}`
    );
    setDocs(res.data);
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied");
  };

  return (
    <div className="documents-page">
      <h2>Search Documents</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter keywords (ex: php database)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="documents-grid">
        {docs.length === 0 && <p>No documents found</p>}

        {docs.map(doc => (
          <div className="document-card" key={doc._id}>
            <h4>{doc.filename}</h4>

            <div className="doc-actions">
              <FaEye onClick={() => window.open(doc.fileUrl, "_blank")} />
              <FaShareAlt onClick={() => copyLink(doc.fileUrl)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
