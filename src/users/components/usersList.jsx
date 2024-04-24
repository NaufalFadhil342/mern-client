import React from 'react';
import '../../styles/users/usersList.css';
import UsersItem from './usersItem';
import Card from '../../Shared/components/UIElement/card';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>Users Not Found.</Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => (
        <UsersItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />
      ))}
    </ul>
  );
};

export default UsersList;
