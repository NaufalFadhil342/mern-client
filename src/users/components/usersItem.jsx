import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/users/usersItem.css';
import Avatar from '../../Shared/components/UIElement/avatar';

const UsersItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Link to={`/places/${props.id}`}>
          <div className="user-item__image">
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UsersItem;
