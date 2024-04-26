import { useState } from "react";
import Map from "./map";
import pinList from "../extract";
import './Display.css';

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  async function fetchData() {
    try {
      const pins = await pinList();
      console.log(pins.rows);
      const files = pins.rows.map((pin, index) => (
        <Map key={index} pin={pin} />
      ));
      setData(files);
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[75vw]">
        {data}
      </div>
      
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease",
          position:"relative",
          bottom:"150px",
          left:"400px"
        }}
        onClick={fetchData}
      >
        Get your data
      </button>
      <div className="flex flex-col items-center justify-center">
        {data}
      </div>
    </>
  );
};

export default Display;
