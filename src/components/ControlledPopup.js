import React, { useContext } from 'react';
import Popup from 'reactjs-popup';  
import { AppContext } from "../App"

const ControlledPopup = () => {
const {open, setOpen} = useContext(AppContext)

  const closeModal = () => setOpen(false);
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          Game Complete!
        </div>
      </Popup>
    </div>
  );
};

export default ControlledPopup