import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css"; // same styling as Merge page

function SplitPdf() {
  const [documents, setDocuments] = useState([]); // all PDFs
  const [selectedPdf, setSelectedPdf] = useState(null); // PDF to split
  const [showSplitInput, setShowSplitInput] = useState(false); // show input after clicking Split
  const [startPage, setStartPage] = useState(""); 
  const [endPage, setEndPage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Fetch PDFs on mount
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

  // Click on Split button in card
  const handleSplitClick = (doc) => {
    setSelectedPdf(doc);
    setShowSplitInput(true);
    setDownloadUrl("");
    setStartPage("");
    setEndPage("");
  };

  // Confirm split after entering pages
  const handleSplitConfirm = async () => {
    if (!startPage || !endPage) return alert("Enter start and end pages");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/split-range/${selectedPdf._id}`,
        {
          startPage: parseInt(startPage),
          endPage: parseInt(endPage)
        }
      );

      setDownloadUrl(res.data.downloadUrl);
      alert("PDF split successfully! Click Download below.");
      setShowSplitInput(false);
    } catch (err) {
      console.error("Split failed:", err);
      alert("Split failed. Check console for details.");
    }
  };

  return (
    <div className="documents-page">
      <h2>Split PDF</h2>

      {/* PDF Cards */}
      <div className="documents-grid">
        {documents.map(doc => (
          <div
            key={doc._id}
            className={`document-card ${selectedPdf?._id === doc._id ? "selected" : ""}`}
          >
            <h4>{doc.filename}</h4>
            <div className="doc-actions">
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                <button>View</button>
              </a>
              <button onClick={() => handleSplitClick(doc)}>Split</button>
            </div>
          </div>
        ))}
      </div>

      {/* Input start/end page */}
      {showSplitInput && selectedPdf && (
        <div className="split-section">
          <input
            type="number"
            min="1"
            placeholder="Start Page"
            value={startPage}
            onChange={e => setStartPage(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="End Page"
            value={endPage}
            onChange={e => setEndPage(e.target.value)}
          />
          <button className="download-btn" onClick={handleSplitConfirm}>
            Split PDF
          </button>
        </div>
      )}

      {/* Download button */}
      {downloadUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={downloadUrl} download>
            <button className="download-btn">Download Split PDF</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default SplitPdf;
