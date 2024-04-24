import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../../styles/shared/Navigation/mainNavigation.css';
import { MdMenu, MdClose } from 'react-icons/md';
import MainHeader from './mainHeader';
import Navlink from './navlink';
import SideDrawer from './sideDrawer';
import Backdrop from '../UIElement/backdrop';

const MainNavigation = () => {
  const [isSideDrawer, setIsSideDrawer] = useState(false);
  const { userId } = useParams();

  return (
    <React.Fragment>
      {isSideDrawer && <Backdrop onClick={() => setIsSideDrawer(false)} />}
      {isSideDrawer && <SideDrawer onClose={() => setIsSideDrawer(false)} userId={userId} closeIcon={<MdClose />} show={isSideDrawer} setIsSideDrawer={setIsSideDrawer} />}
      <MainHeader>
        <span className="menuToggle" onClick={() => setIsSideDrawer(true)}>
          <MdMenu />
        </span>
        <h1 className="main-navigation__title">
          <Link to="/" className="link">
            YourPlaces
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <Navlink userId={userId} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
