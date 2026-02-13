import { useEffect, useState } from "react";
import axios from "axios";
import "./documents.css";

function DocToPdf() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState({});

  // Fetch all documents on component load
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      // Filter only .docx files
      const docxDocs = res.data.filter(doc => doc.filename.endsWith(".docx"));
      setDocuments(docxDocs);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Upload DOCX file
  const handleUpload = async () => {
    if (!file) return alert("Select a DOCX file");

    const formData = new FormData();
    formData.append("files", file);

    try {
      await axios.post("http://localhost:5000/api/documents/upload", formData);
      setFile(null);
      fetchDocuments(); // Refresh list
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  // Convert DOCX to PDF
  const handleConvertToPDF = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/doc-to-pdf/${id}`
      );

      // Save download URL for this document
      setDownloadLinks(prev => ({
        ...prev,
        [id]: res.data.downloadUrl
      }));
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Conversion failed");
    }
  };

  return (
    <div className="documents-page">
      <div className="documents-header">
        <h2>DOCX to PDF Converter</h2>

        {/* Upload Section */}
        <div className="custom-category">
          <input
            type="file"
            accept=".docx"
            onChange={e => setFile(e.target.files[0])}
          />
          <button onClick={handleUpload}>Upload DOCX</button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="documents-grid">
        {documents.map(doc => (
          <div key={doc._id} className="document-card">
            <h4>{doc.filename}</h4>
            <p className="doc-category">DOCX File</p>

            <div className="doc-actions">
              {/* View DOCX in browser */}
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                <button>View</button>
              </a>

              {/* Convert to PDF */}
              <button onClick={() => handleConvertToPDF(doc._id)}>
                Convert to PDF
              </button>

              {/* Download converted PDF */}
              {downloadLinks[doc._id] && (
                <a href={downloadLinks[doc._id]} download>
                  <button className="download-btn">Download PDF</button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocToPdf;
