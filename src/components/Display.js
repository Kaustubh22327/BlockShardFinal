import { useState } from "react";
import Map from "./map";
import pinList from "../extract";
import './Display.css';
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  async function fetchData() {
    try {
      const pins = await pinList(); // Call the function within an async function
      console.log(pins.rows);
      const files = pins.rows.map((pin) => {
        return(
          <Map pin={pin} />
        );
      })
      setData(files);
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };
  // const getdata = async () => {
  //   let dataArray;
  //   const Otheraddress = document.querySelector(".address").value;
  //   try {
  //     if (Otheraddress) {
  //       dataArray = await contract.display(Otheraddress);
  //       console.log(dataArray);
  //     } else {
  //       dataArray = await contract.display(account);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     alert("You don't have access");
  //   }
  //   const isEmpty = Object.keys(dataArray).length === 0;

  //   if (!isEmpty) {
  //     const str = dataArray.toString();
  //     const str_array = str.split(",");
  //     // console.log(str);
  //     // console.log(str_array);
  //     const images = str_array.map((item, i) => {
  //       return (
  //         <a href={item} key={i} target="_blank" rel="noreferrer noopener">
  //           <img
  //             key={i}
  //             src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
  //             alt="new"
  //             className="image-list"
  //           ></img>
  //         </a>
  //       );
  //     });
  //     setData(images);
  //   } else {
  //     alert("No image to display");
  //   }
  
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[75vw] relative right-[90px]">
      <button className="button-36" onClick={fetchData}>
        Get your data
      </button>
      <div className="flex flex-col items-center justify-center">{data}
      </div>
      </div>
      
    </>
  );
}
export default Display;
