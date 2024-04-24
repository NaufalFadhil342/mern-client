import React from 'react';
import '../../../styles/shared/Navigation/mainHeader.css';

const MainHeader = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
