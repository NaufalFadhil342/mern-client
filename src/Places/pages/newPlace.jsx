import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/places/pages/placeForm.css';
import { useForm } from '../../Shared/hooks/form-hook';
import ErrorModal from '../../Shared/components/UIElement/errorModal';
import LoadingSpinner from '../../Shared/components/UIElement/loadingSpinner';
import Input from '../../Shared/components/FormElement/input';
import ImageUpload from '../../Shared/components/FormElement/imageUpload';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import Button from '../../Shared/components/FormElement/Button';

const NewPlace = () => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, 'POST', formData, {
        Authorization: 'Bearer ' + token,
      });
      navigate('/');
    } catch {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title." onInput={inputHandler} />
        <Input id="description" element="textarea" type="text" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description (at least 5 characters)." onInput={inputHandler} />
        <Input id="address" element="input" type="text" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid address." onInput={inputHandler} />
        <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image." />
        <Button type="submit">ADD PLACE</Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
