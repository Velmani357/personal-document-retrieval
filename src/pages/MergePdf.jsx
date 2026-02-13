import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css";

function MergePdf() {
  const [documents, setDocuments] = useState([]); // All PDFs
  const [selected, setSelected] = useState([]);   // Selected PDFs
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch all PDFs from backend
  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      const pdfs = res.data.filter(doc => doc.filename.endsWith(".pdf"));
      setDocuments(pdfs);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  // Toggle selection of PDF
  const toggleSelect = (doc) => {
    setSelected(prev =>
      prev.includes(doc._id)
        ? prev.filter(id => id !== doc._id)
        : [...prev, doc._id]
    );
  };

  // Merge selected PDFs
  const handleMerge = async () => {
    if (selected.length < 2) return alert("Select at least 2 PDFs");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/merge`,
        { ids: selected }  // backend expects { ids: [] }
      );

      setDownloadUrl(res.data.downloadUrl);
      setSelected([]); // Clear selection after merge
      fetchDocuments(); // Optional: refresh list
    } catch (err) {
      console.error("Merge failed:", err);
      alert("Merge failed");
    }
  };

  return (
    <div className="documents-page">
      <h2>Merge PDFs</h2>

      <div className="documents-grid">
        {documents.map(doc => (
          <div
            key={doc._id}
            className={`document-card ${selected.includes(doc._id) ? "selected" : ""}`}
            onClick={() => toggleSelect(doc)}
          >
            <h4>{doc.filename}</h4>
            <div className="doc-actions">
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                <button>View</button>
              </a>
              <button>
                {selected.includes(doc._id) ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected.length >= 2 && (
        <button className="download-btn" onClick={handleMerge}>
          Merge & Download
        </button>
      )}

      {downloadUrl && (
        <a href={downloadUrl} >
          <button className="download-btn">Download Merged PDF</button>
        </a>
      )}
    </div>
  );
}

export default MergePdf;
