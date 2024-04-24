import React, { useEffect, useState } from 'react';
import '../../styles/places/pages/userPlaces.css';
import PlacesList from '../components/placesList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorModal from '../../Shared/components/UIElement/errorModal';
import LoadingSpinner from '../../Shared/components/UIElement/loadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlacesList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
    </React.Fragment>
  );
};

export default UserPlaces;
