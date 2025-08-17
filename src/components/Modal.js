import { useEffect, useRef } from "react";
import "./Modal.css";
import toast from "react-hot-toast";
const Modal = ({ setModalOpen, contract }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    try {
      await contract.allow(address);
      toast.success('Access granted');
      setModalOpen(false);
    } catch (e) {
      toast.error('Failed to share');
    }
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  useEffect(() => {
    closeButtonRef.current && closeButtonRef.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setModalOpen]);
  return (
    <>
      <div className="modalBackground" role="dialog" aria-modal="true" aria-labelledby="share-title">
        <div className="modalContainer" ref={dialogRef}>
          <div className="title" id="share-title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              ref={closeButtonRef}
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
