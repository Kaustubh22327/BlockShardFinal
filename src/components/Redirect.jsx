import { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Web3 } from "web3";
import Display from "./Display";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import "./Redirect.css";
import blockimage from "./../components/—Pngtree—network bitcoin technology blockchain big_4034259.png";
import Modal from "./Modal";
const Redirect = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new Web3(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setAccount(accounts[0]);
          })
          .catch((error) => {
            alert("null");
          });
        let contractAddress = "0xF58EfDc30F6e8c12f94fa1d41D3ED423AfeE4951";
        const abi = require("../artifacts/contracts/New.sol/New.json").abi;
        const contract = new provider.eth.Contract(abi, contractAddress);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="flex items-start">
      <div className="ml-[17%]">
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
        <div className="new">
          <h1
            style={{
              color: "#135D66",
              marginTop: 0,
              fontFamily: "sans-serif",
              fontSize: "50px",
              right: "230px",
              position: "relative",
              fontWeight: 550,
            }}
          >
            BlockShard
          </h1>
          <h2
            className="storage-heading"
            style={{
              color: "#135D66",
              right: "230px",
              marginTop: 20,
              fontFamily: "sans-serif",
              fontSize: 45,
              textAlign: "left",
              right: "230px",
              position: "relative",
              fontWeight: 550,

            }}
          >
            Simplifing File Storage on Blockchain
          </h2>
          <p
            style={{
              color: "#135D66",
              right: "230px",
              marginTop: 20,
              fontFamily: "sans-serif",
              fontSize: 26,
              textAlign: "left",
              right: "230px",
              position: "relative",
              fontWeight: 510,

            }}
          >
            From storage to sharing , Blockshard does it all for you
          </p>
          <img className="block-img" src={blockimage} alt="" />
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>

          <p
            style={{
              color: "white",
              fontFamily: "sans-serif",
              fontSize: "25px",
              bottom: "250px",
              position: "relative",
              background:"linear-gradient(to right, #8e2de2, #4a00e0)",
              width: "967px",
              display: "block",
              justifyContent: "center",
              alignItems: "center",
           
            }}
          >
              Metamask Account Connection ID :{" "}
            {account ? account : "Not connected"}
          </p>
          <FileUpload
            account={account}
            provider={provider}
            contract={contract}
          ></FileUpload>
          <Display contract={contract} account={account} />
        </div>
      </div>
    </div>
  );
};

export default Redirect;
