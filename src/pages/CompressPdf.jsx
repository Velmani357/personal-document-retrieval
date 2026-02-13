import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css";

function CompressPdf() {
  const [documents, setDocuments] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      const pdfs = res.data.filter(doc => doc.filename.endsWith(".pdf"));
      setDocuments(pdfs);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  const handleCompress = async () => {
    if (!selectedPdf) return alert("Select a PDF first");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/compress/${selectedPdf._id}`
      );

      setDownloadUrl(res.data.downloadUrl);
      alert("PDF compressed successfully! Click Download below.");
    } catch (err) {
      console.error("Compression failed:", err);
      alert("Compression failed. Check console for details.");
    }
  };

  return (
    <div className="documents-page">
      <h2>Compress PDF</h2>

      <div className="documents-grid">
        {documents.map(doc => (
          <div
            key={doc._id}
            className={`document-card ${selectedPdf?._id === doc._id ? "selected" : ""}`}
            onClick={() => {
              setSelectedPdf(doc);
              setDownloadUrl(""); // clear previous download
            }}
          >
            <h4>{doc.filename}</h4>
            <div className="doc-actions">
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                <button>View</button>
              </a>
              <button>
                {selectedPdf?._id === doc._id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPdf && (
        <button className="download-btn" onClick={handleCompress}>
          Compress PDF
        </button>
      )}

      {downloadUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={downloadUrl} download>
            <button className="download-btn">Download Compressed PDF</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default CompressPdf;
