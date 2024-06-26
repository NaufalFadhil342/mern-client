import React from 'react';
import '../../../styles/shared/UIElement/loadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
