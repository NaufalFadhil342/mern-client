import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import '../../../styles/shared/Navigation/navlink.css';

const Navlink = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <NavLink to="/" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`}>
        ALL USERS
      </NavLink>
      {isLoggedIn && (
        <NavLink to={`/places/${userId}`} className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`}>
          MY PLACES
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/places/new" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`}>
          ADD PLACE
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to="/auth" className={`navlink ${({ isActive }) => (isActive ? 'active' : '')}`}>
          AUTHENTICATE
        </NavLink>
      )}
      {isLoggedIn && (
        <button className="logout" onClick={onLogout}>
          LOGOUT
        </button>
      )}
    </>
  );
};

export default Navlink;
