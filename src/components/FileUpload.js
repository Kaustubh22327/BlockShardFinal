import { useEffect, useState } from "react";
import "./FileUpload.css";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

const FileUpload = ({account,provider,contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1ffeed8a26d709a5d51d`,
            pinata_secret_api_key: `bb1bf851455345b57a4ca0ab619c3526569115c050c7e9189e980ae65319aacc`,
            "Content-Type": "multipart/form-data",
          },
        });
        // const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // contract.add(account,ImgHash);
        alert("Successfully Uploaded");
        setFileName("No File selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload file to Pinata");
      }
    }
    setFileName("No File selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files objec
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <>
    <div className="top">
      
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Select File
        </label>
        <input
          // disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div> 
    </>
   
  );
};
export default FileUpload;