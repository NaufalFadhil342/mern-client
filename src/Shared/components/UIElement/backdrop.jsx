import React from 'react';
import { createPortal } from 'react-dom';
import '../../../styles/shared/UIElement/backdrop.css';

const Backdrop = ({ onClick }) => {
  return createPortal(
    <div className="backdrop" onClick={onClick}>
      Backdrop
    </div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
