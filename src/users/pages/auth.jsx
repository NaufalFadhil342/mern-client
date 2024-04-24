import React, { useState, useContext } from 'react';
import '../../styles/users/auth.css';
import Card from '../../Shared/components/UIElement/card';
import Input from '../../Shared/components/FormElement/input';
import Button from '../../Shared/components/FormElement/Button';
import ErrorModal from '../../Shared/components/UIElement/errorModal';
import LoadingSpinner from '../../Shared/components/UIElement/loadingSpinner';
import ImageUpload from '../../Shared/components/FormElement/imageUpload';
import { AuthContext } from '../../Shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const { login } = useContext(AuthContext);

  const authSwitchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.input.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        login(responseData.userId, responseData.token);
      } catch {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, 'POST', formData);
        login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required!</h2>
        <hr />
        <form onSubmit={authSubmitHandler} encType="multipart/form-data">
          {!isLoginMode && <Input id="name" element="input" type="text" label="Your name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter your name." onInput={inputHandler} />}
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image." />}
          <Input id="email" element="input" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter your valid email (add @ in it)" onInput={inputHandler} />
          <Input id="password" element="input" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter your valid password (Min. 5 characters)" onInput={inputHandler} />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Link className="link" onClick={authSwitchHandler}>
          Go to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Link>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
