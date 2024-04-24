import React from 'react';
import '../../styles/places/components/placesList.css';
import Card from '../../Shared/components/UIElement/card';
import PlacesItem from './placesItem';
import Button from '../../Shared/components/FormElement/Button';

const PlacesList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one!</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlacesItem key={place.id} id={place.id} image={place.image} title={place.title} description={place.description} address={place.address} creatorId={place.creator} coordinates={place.location} onDelete={onDeletePlace} />
      ))}
    </ul>
  );
};

export default PlacesList;
