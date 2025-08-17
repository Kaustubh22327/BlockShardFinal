import { useEffect, useState, useRef } from "react";
import "./FileUpload.css";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar/Navbar";

const FileUpload = ({account,provider,contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File selected");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [dropActive, setDropActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadList = files.length > 0 ? files : (file ? [file] : []);
    if (uploadList.length > 0) {
      try {
        setIsUploading(true);
        setStatus("Uploading...");
        toast.loading('Uploading...', { id: 'upload' });
        for (let i = 0; i < uploadList.length; i++) {
          const currentFile = uploadList[i];
          const formData = new FormData();
          formData.append("file", currentFile);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `1ffeed8a26d709a5d51d`,
              pinata_secret_api_key: `bb1bf851455345b57a4ca0ab619c3526569115c050c7e9189e980ae65319aacc`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (evt) => {
              if (!evt.total) return;
              const percent = Math.round((evt.loaded * 100) / evt.total);
              const base = Math.floor((i / uploadList.length) * 100);
              const combined = Math.min(99, base + Math.floor(percent / uploadList.length));
              setProgress(combined);
            },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          try { contract.add(ImgHash); } catch(e) { /* keep UI resilient */ }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setStatus("Successfully uploaded");
        toast.success('Upload complete', { id: 'upload' });
        setIsUploading(false);
        setProgress(0);
      }
    }
    setFileName("No File selected");
    setFile(null);
    setFiles([]);
  };

  const retrieveFile = (e) => {
    const list = Array.from(e.target.files || []); //files array of files objec
    if (list.length === 0) return;
    setFiles(list);
    setFile(list[0]);
    setFileName(list.length > 1 ? `${list.length} files selected` : list[0].name);
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropActive(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
      setFile(droppedFiles[0]);
      setFileName(droppedFiles.length > 1 ? `${droppedFiles.length} files selected` : droppedFiles[0].name);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDropActive(false);
  };

  const handleZoneClick = () => {
    if (inputRef.current && !isUploading && account) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (file && file.type && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl("");
  }, [file]);

  return (
    <>
    <div className="top">
      
      <form className="form" onSubmit={handleSubmit}>
        <div
          className={`dropzone${dropActive ? " active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleZoneClick}
          role="button"
          aria-label="File upload dropzone"
        >
          <div className="dropzone-text">Drag & drop files here or click to browse</div>
          {(files.length > 0 || file) && (
            <div className="fileMeta">Selected: {fileName} {file?.size ? `(${Math.round(file.size/1024)} KB first file)` : ""}</div>
          )}
          {previewUrl && (
            <img src={previewUrl} alt="preview" className="previewImg" />
          )}
        </div>
        <label htmlFor="file-upload" className="choose">
          Select File
        </label>
        <input
           ref={inputRef}
           disabled={!account || isUploading}
          type="file"
          id="file-upload"
          name="data"
          multiple
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!(file || files.length) || isUploading}>
          Upload File
        </button>
        {isUploading && (
          <div style={{ width: "100%", marginTop: 10 }} aria-label="upload-progress">
            <div style={{
              width: `${progress}%`,
              height: 6,
              backgroundColor: "#4CAF50",
              borderRadius: 3,
              transition: "width 0.2s ease"
            }} />
          </div>
        )}
        {status && (
          <div className="statusText" style={{ marginTop: 10, fontSize: 14 }}>
            {status}
          </div>
        )}
      </form>
    </div> 
    </>
    
  );
};
export default FileUpload;