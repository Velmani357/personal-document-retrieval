import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import {
  FaUpload,
  FaFileAlt,
  FaSearch,
  FaFilePdf,
  FaFileWord,
  FaCompress,
  FaObjectGroup,
  FaLock,
  FaCut
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Document Management Dashboard</h2>
      </div>

      {/* Cards */}
      <div className="dashboard-grid">

        <div className="dash-card" onClick={() => navigate("/upload")}>
          <FaUpload className="dash-icon" />
          <h3>Upload Documents</h3>
          <p>Upload files and folders</p>
        </div>

        <div className="dash-card" onClick={() => navigate("/documents")}>
          <FaFileAlt className="dash-icon" />
          <h3>All Documents</h3>
          <p>View & manage documents</p>
        </div>

        <div className="dash-card" onClick={() => navigate("/search")}>
          <FaSearch className="dash-icon" />
          <h3>Search Documents</h3>
          <p>Search with multiple keywords</p>
        </div>

        {/* PDF to DOC */}
        <div className="dash-card" onClick={() => navigate("/pdf-to-doc")}>
          <FaFilePdf className="dash-icon" />
          <h3>PDF → DOCX</h3>
          <p>Convert PDF to Word</p>
        </div>

        {/* DOC to PDF */}
        <div className="dash-card" onClick={() => navigate("/doc-to-pdf")}>
          <FaFileWord className="dash-icon" />
          <h3>DOCX → PDF</h3>
          <p>Convert Word to PDF</p>
        </div>

        {/* Merge PDF */}
        <div className="dash-card" onClick={() => navigate("/merge-pdf")}>
          <FaObjectGroup className="dash-icon" />
          <h3>Merge PDF</h3>
          <p>Combine multiple PDFs</p>
        </div>

        {/* Split PDF */}
        <div className="dash-card" onClick={() => navigate("/split-pdf")}>
          <FaCut className="dash-icon" />
          <h3>Split PDF</h3>
          <p>Split PDF pages</p>
        </div>

        {/* Compress PDF */}
        <div className="dash-card" onClick={() => navigate("/compress-pdf")}>
          <FaCompress className="dash-icon" />
          <h3>Compress PDF</h3>
          <p>Reduce file size</p>
        </div>
        <div className="dash-card" onClick={() => navigate("/secure-pdf")}>
  <FaLock className="dash-icon" />
  <h3>Secure PDF</h3>
  <p>Encrypt the files</p>
</div>

      </div>

    </div>
  );
}
