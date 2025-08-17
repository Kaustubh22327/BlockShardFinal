import { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Web3 } from "web3";
import Display from "./Display";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import "./Redirect.css";
import Modal from "./Modal";
const Redirect = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const formatAccount = (addr) => {
    if (!addr) return "Not connected";
    const start = addr.slice(0, 6);
    const end = addr.slice(-4);
    return `${start}...${end}`;
  };

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
            alert("Please connect your account");
          });
        let contractAddress = "0x647Df98999BF89333857Ca1bfF950550623c2687";
        const abi = require("../artifacts/contracts/New.sol/New.json").abi;
        const contract = new provider.eth.Contract(abi, contractAddress);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "100%", maxWidth: 800, padding: "24px 16px" }}>
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
        <div>

          <p
            style={{
              color: "#135D66",
              fontFamily: "sans-serif",
              fontSize: 14,
              margin: "12px auto 8px",
              position: "static",
              textAlign: "center"
            }}
          >
            Wallet: {formatAccount(account)}
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
