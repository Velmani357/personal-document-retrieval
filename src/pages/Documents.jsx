import { useEffect, useState } from "react";
import axios from "axios";
import "./documents.css";
import { FaEye, FaShareAlt } from "react-icons/fa";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [category, setCategory] = useState("All");
  const [customCategory, setCustomCategory] = useState("");

  const [categories, setCategories] = useState([
    "All",
    "Personal",
    "Academic",
    "Subject"
  ]);

  // Fetch all documents
  const fetchDocs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      setDocs(res.data);
    } catch (err) {
      console.log("Error fetching docs", err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Update category
  const updateCategory = async (id, newCategory) => {
    try {
      await axios.put(`http://localhost:5000/api/documents/category/${id}`, {
        category: newCategory
      });
      fetchDocs();
    } catch (err) {
      console.log(err);
    }
  };

  // Drag handlers
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("docId", id);
  };

  const onDrop = (e, newCategory) => {
    const id = e.dataTransfer.getData("docId");
    updateCategory(id, newCategory);
  };

  const filteredDocs =
    category === "All"
      ? docs
      : docs.filter((doc) => doc.category === category);

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Document link copied!");
  };

  const addCustomCategory = () => {
    if (!customCategory) return;

    if (!categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
    }

    setCustomCategory("");
  };

  return (
    <div className="documents-page">

      {/* Header */}
      <div className="documents-header">
        <h2>My Documents</h2>

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Custom Category */}
        <div className="custom-category">
          <input
            type="text"
            placeholder="New category..."
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
          <button onClick={addCustomCategory}>Add</button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="documents-grid">
        {filteredDocs.length === 0 ? (
          <p>No documents found</p>
        ) : (
          filteredDocs.map((doc) => (
            <div
              className="document-card"
              key={doc._id}
              draggable
              onDragStart={(e) => onDragStart(e, doc._id)}
            >
              <h4>{doc.filename}</h4>
              <p className="doc-category">{doc.category}</p>

              <div className="doc-actions">
                <FaEye
                  title="View"
                  onClick={() => window.open(doc.fileUrl, "_blank")}
                />

                <FaShareAlt
                  title="Share"
                  onClick={() => copyLink(doc.fileUrl)}
                />
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
