import { useEffect, useState } from "react";
import axios from "axios";
import "./documents.css";
import { FaEye, FaShareAlt, FaFilePdf } from "react-icons/fa";

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

  // PDF → DOC converter
  const convertPdfToDoc = async (doc) => {
  try {
    console.log("Sending filePath:", doc.path);

    // const res = await axios.post(

    //   "http://localhost:5000/api/documents/pdf-to-doc",
    //   { filePath: doc.path },
    //   { headers: { "Content-Type": "application/json" } }
    // );

    // window.open(res.data.docxUrl, "_blank");
    const formData = new FormData();
formData.append("file", selectedFile);

const res = await axios.post(
  "http://localhost:5000/api/documents/pdf-to-doc",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);

window.open(res.data.docxUrl, "_blank"); // Download converted file

  } 
  catch (err) {
    console.log("Frontend error:", err);
    alert("Conversion failed");
  }
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
                {/* View */}
                <FaEye
                  title="View"
                  onClick={() => window.open(doc.fileUrl, "_blank")}
                />

                {/* Share */}
                <FaShareAlt
                  title="Share"
                  onClick={() => copyLink(doc.fileUrl)}
                />

                {/* PDF to DOC */}
                {doc.filename.toLowerCase().endsWith(".pdf") && (
                  <FaFilePdf
                    title="PDF → DOC"
                    onClick={() => convertPdfToDoc(doc)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
