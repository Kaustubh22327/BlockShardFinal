import { useState } from "react";
import Map from "./map";
import pinList from "../extract";
import './Display.css';

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      setError("");
      const pins = await pinList();
      console.log(pins.rows);
      const files = pins.rows.map((pin, index) => (
        <Map key={index} pin={pin} />
      ));
      setData(files);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pins:', error);
      setError('Error fetching files');
      setLoading(false);
    }
  }

  return (
    <>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease",
          display: "block",
          margin: "20px auto"
        }}
        onClick={fetchData}
      >
        Get your data
      </button>
      <div className="flex flex-col items-center justify-center">
        {error && (
          <div style={{ color: 'red', marginTop: 10 }}>{error}</div>
        )}
        {loading && (
          <div style={{ marginTop: 10 }}>Loading...</div>
        )}
        {!loading && !error && (!data || (Array.isArray(data) && data.length === 0)) && (
          <div style={{ marginTop: 10 }}>No files found</div>
        )}
        {!loading && !error && data}
      </div>
    </>
  );
};

export default Display;
