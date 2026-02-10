import { useState } from "react";
import axios from "axios";
import "./upload.css";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Upload() {
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select files or folder");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    await axios.post("http://localhost:5000/api/documents/upload", formData);
    alert("Upload Successful ✅");
    setFiles([]);
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <FaCloudUploadAlt className="upload-icon" />

        <h2>Upload Documents</h2>
        <p>Select files or folders to upload securely</p>

        <input
          type="file"
          multiple
          webkitdirectory="true"
          directory="true"
          onChange={(e) => setFiles(e.target.files)}
        />

        <button onClick={handleUpload}>Upload</button>

      </div>

    </div>
  );
}
