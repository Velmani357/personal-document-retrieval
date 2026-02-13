import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Document from "./pages/Documents"
import Search from "./pages/SearchDocuments"
import PdfToDoc from "./pages/PdfToDoc";
import DocToPdf from "./pages/DocToPdf";
import MergePdf from "./pages/MergePdf";
import SplitPdf from "./pages/SplitPdf";
import CompressPdf from "./pages/CompressPdf";
import SecurePdf from "./pages/SecurePdf";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/documents" element={<Document />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pdf-to-doc" element={<PdfToDoc />} />
<Route path="/doc-to-pdf" element={<DocToPdf />} />
<Route path="/merge-pdf" element={<MergePdf />} />
<Route path="/split-pdf" element={<SplitPdf />} />
<Route path="/compress-pdf" element={<CompressPdf />} />
<Route path="/secure-pdf" element={<SecurePdf/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
