import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState({});
  const [newName, setNewName] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/documents/${id}`)
      .then(res => {
        setDoc(res.data);
        setNewName(res.data.filename);
      });
  }, [id]);

  const renameDoc = async () => {
    await axios.put(`http://localhost:5000/api/documents/${id}`, {
      filename: newName
    });
    alert("Renamed");
  };

  return (
    <div className="page">
      <h2>{doc.filename}</h2>

      <textarea value={doc.content} readOnly rows="15" />

      <input 
        value={newName}
        onChange={(e)=>setNewName(e.target.value)}
      />
      <button onClick={renameDoc}>Rename</button>

      <a 
        href={`https://mail.google.com/mail/?view=cm&fs=1&su=${doc.filename}&body=${doc.content}`}
        target="_blank"
      >
        Share via Gmail
      </a>

      <a 
        href={`https://wa.me/?text=${doc.content}`}
        target="_blank"
      >
        Share via WhatsApp
      </a>
    </div>
  );
}

export default ViewDocument;
