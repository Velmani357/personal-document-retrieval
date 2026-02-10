import { useEffect, useState } from "react";
import axios from "axios";
import "./documents.css";

export default function UploadDocuments(){

  const [docs,setDocs] = useState([]);
  const [keyword,setKeyword] = useState("");
  const [selectedDoc,setSelectedDoc] = useState(null);

  useEffect(()=>{
    fetchDocs();
  },[]);

  const fetchDocs = async ()=>{
    const res = await axios.get("http://localhost:5000/api/documents");
    setDocs(res.data);
  };

  const uploadFile = async (e)=>{
    const files = e.target.files;

    for(let file of files){
      const formData = new FormData();
      formData.append("file",file);

      await axios.post("http://localhost:5000/api/documents/upload",formData);
    }
    fetchDocs();
  };

  const searchDocs = async ()=>{
    const res = await axios.get(
      `http://localhost:5000/api/documents/search?keyword=${keyword}`
    );
    setDocs(res.data);
  };

  const renameDoc = async ()=>{
    const newName = prompt("Enter new filename");
    if(!newName) return;

    await axios.put(
      `http://localhost:5000/api/documents/rename/${selectedDoc._id}`,
      { filename:newName }
    );
    fetchDocs();
  };

  const deleteDoc = async ()=>{
    await axios.delete(`http://localhost:5000/api/documents/${selectedDoc._id}`);
    setSelectedDoc(null);
    fetchDocs();
  };

  return (
    <div className="documents-page">

      <h2>Document Manager</h2>

      {/* Upload */}
      <div className="upload-box">
        <input type="file" multiple webkitdirectory="true" onChange={uploadFile}/>
      </div>

      {/* Search */}
      <div className="search-box">
        <input 
          type="text"
          placeholder="Search by keywords..."
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
        />
        <button onClick={searchDocs}>Search</button>
      </div>

      {/* Documents */}
      <div className="doc-grid">
        {docs.map(doc=>(
          <div className="doc-card" key={doc._id}>
            <p>{doc.filename}</p>
            <button onClick={()=>setSelectedDoc(doc)}>View</button>
          </div>
        ))}
      </div>

      {/* Viewer */}
      {selectedDoc && (
        <div className="viewer-overlay">
          <div className="viewer-box">

            <div className="viewer-header">
              <h3>{selectedDoc.filename}</h3>
              <button onClick={()=>setSelectedDoc(null)}>X</button>
            </div>

            <iframe
              src={selectedDoc.fileUrl}
              title="viewer"
              className="doc-viewer"
            ></iframe>

            <div className="viewer-actions">
              <button onClick={renameDoc}>Rename</button>
              <a href={selectedDoc.fileUrl} download>
                <button>Download</button>
              </a>
              <button onClick={deleteDoc} className="danger">Delete</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
