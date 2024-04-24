import React, { useState, useContext } from 'react';
import '../../styles/places/components/placeItem.css';
import { AuthContext } from '../../Shared/context/auth-context';
import Card from '../../Shared/components/UIElement/card';
import Button from '../../Shared/components/FormElement/Button';
import Modal from '../../Shared/components/UIElement/modal';
import Map from '../../Shared/components/UIElement/map';
import ErrorModal from '../../Shared/components/UIElement/errorModal';
import LoadingSpinner from '../../Shared/components/UIElement/loadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const PlacesItem = (props) => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { title, description, address, image, id, coordinates, onDelete, creatorId } = props;
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { userId, token } = useContext(AuthContext);

  const showDeleteHandler = () => setShowConfirm(true);

  const cancelConfirmHandler = () => setShowConfirm(false);

  const deleteConfirmHandler = async () => {
    setShowConfirm(false);

    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + token,
      });
      onDelete(id);
    } catch {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal show={showMap} onCancel={() => setShowMap(false)} header={address} contentClass="place-item__modal-content" footerClass="place-item__modal-actions" footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}>
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        cancel={cancelConfirmHandler}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteConfirmHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure want to proceed and delete this place? Please note it can't be undone thereafter.</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => setShowMap(true)}>
              VIEW ON MAP
            </Button>
            {userId === creatorId && <Button to={`/${id}`}>EDIT</Button>}
            {userId === creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlacesItem;
