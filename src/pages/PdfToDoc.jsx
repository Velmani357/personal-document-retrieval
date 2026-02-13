import { useEffect, useState } from "react";
import axios from "axios";
import "./documents.css"; // your same CSS file

function PdfToDoc() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:5000/api/documents");
    const pdfDocs = res.data.filter(doc => doc.filename.endsWith(".pdf"));
    setDocuments(pdfDocs);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("files", file);

    await axios.post("http://localhost:5000/api/documents/upload", formData);
    setFile(null);
    fetchDocuments();
  };

  const handleConvert = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/documents/convert/${id}`
      );

      setDownloadLinks(prev => ({
        ...prev,
        [id]: res.data.downloadUrl
      }));
    } catch (err) {
      alert("Conversion failed");
    }
  };

  return (
    <div className="documents-page">
      <div className="documents-header">
        <h2>PDF to DOC Converter</h2>

        {/* Upload Section */}
        <div className="custom-category">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>

      {/* Grid */}
      <div className="documents-grid">
        {documents.map(doc => (
          <div key={doc._id} className="document-card">
            <h4>{doc.filename}</h4>
            <p className="doc-category">PDF File</p>

            <div className="doc-actions">
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                <button>View</button>
              </a>

              <button onClick={() => handleConvert(doc._id)}>
                Convert
              </button>

              {downloadLinks[doc._id] && (
                <a href={downloadLinks[doc._id]} download>
                  <button className="download-btn">Download</button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdfToDoc;
