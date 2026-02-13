import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css";

function SecurePdf() {
  const [documents, setDocuments] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pin, setPin] = useState("");
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

  const handleSecure = async () => {
    if (!selectedPdf) return alert("Select a PDF first");
    if (!pin) return alert("Enter a PIN");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/secure/${selectedPdf._id}`,
        { pin }
      );

      setDownloadUrl(res.data.downloadUrl);
      alert("PDF secured successfully! Click Download below.");
    } catch (err) {
      console.error("Secure PDF failed:", err);
      alert("Operation failed. Check console for details.");
    }
  };

  return (
    <div className="documents-page">
      <h2>Secure PDF Transfer</h2>

      <div className="documents-grid">
        {documents.map(doc => (
          <div
            key={doc._id}
            className={`document-card ${selectedPdf?._id === doc._id ? "selected" : ""}`}
            onClick={() => {
              setSelectedPdf(doc);
              setDownloadUrl("");
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
        <div className="split-section">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => setPin(e.target.value)}
          />
          <button className="download-btn" onClick={handleSecure}>
            Secure PDF
          </button>
        </div>
      )}

      {downloadUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={downloadUrl} download>
            <button className="download-btn">Download Secured PDF</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default SecurePdf;
