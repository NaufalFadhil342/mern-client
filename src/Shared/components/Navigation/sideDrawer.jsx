import React from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import '../../../styles/shared/Navigation/sidedrawer.css';

const SideDrawer = ({ closeIcon, onClose, userId }) => {
  const content = (
    <aside className="side-drawer">
      <button className="closeMenu" onClick={onClose}>
        {closeIcon}
      </button>
      <nav>
        <NavLink to="/" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`} onClick={onClose}>
          ALL USERS
        </NavLink>
        <NavLink to={`/places/${userId}`} className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`} onClick={onClose}>
          MY PLACES
        </NavLink>
        <NavLink to="/places/new" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`} onClick={onClose}>
          ADD PLACE
        </NavLink>
        <NavLink to="/auth" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`} onClick={onClose}>
          AUTHENTICATE
        </NavLink>
      </nav>
    </aside>
  );

  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
