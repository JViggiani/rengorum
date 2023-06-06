import React, {useState} from 'react';
import {Form, Icon, Message, Button} from 'semantic-ui-react';
import StatusMessage from '../../components/statusmessage';
import { GoogleLogout, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { google } from 'googleapis';
import './styles.css';

const Register = ({ isLoading, error, showLogin, handleRegister }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'checked':
        setChecked(value);
        break;
      case 'profile':
        setProfile(value);
        break;
      default:
        break;
    }
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };
  const isFormValid = () => {
    let isFormValid = true;
    if (!username || !name || !email || !password || !checked) {
      isFormValid = false;
    }
    return isFormValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const data = {
        username,
        name,
        email,
        password,
      };
      handleRegister(data);
    }
  };

  const statusMessage = (
    <StatusMessage
      error={error}
      errorMessage={error || 'Login Error'}
      loading={isLoading}
      loadingMessage={'Registering your account'}
      type="modal"
    />
  );

  const googleAuthConfig = {
    clientId: '417973596481-urncu06kgopjihelktho0g9rm7tsmnpf.apps.googleusercontent.com',
    scope: 'email',
  };

  const { signIn } = useGoogleLogin(googleAuthConfig);

  const fetchGoogleEmail = async (response, username, name) => {
    // Rest of the code remains the same
    
    try {
      const userInfo = await oauth2.userinfo.get();
      const { email } = userInfo.data;
      // Use the email to register the user
      const data = {
        username: username,
        name: name,
        email: email,
        password: '', // Since the user is signing in with Google, you can leave the password field empty
      };
      handleRegister(data);
    } catch (error) {
      console.log('Error fetching user email:', error);
    }
  };

  const handleGoogleSuccess = (response) => {
    const { username, name } = this.state; // Assuming you have input fields for username and name in the registration form
    fetchGoogleEmail(response, username, name);
  };

  const handleGoogleError = (response) => {
    // Handle the error login, e.g., refresh and display login failure
    console.log('Google login error:', response);
  };

  return (
    <div>
      <Message
        attached
        header="Welcome to our site!"
        content="Fill out the form below to sign-up for a new account"
      />
      {statusMessage}
      <Form className="attached fluid segment">
        <Form.Input
          required
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <Form.Input
          required
          label="Name"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Form.Input
          required
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Form.Input
          required
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Form.Checkbox
          inline
          required
          label="I agree to the terms and conditions"
          name="agreement"
          checked={checked}
          onChange={handleCheckbox}
        />
        <Button
          color="blue"
          loading={isLoading}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <div>
        <GoogleLogin
          clientId={googleAuthConfig.clientId}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Already signed up?&nbsp;
        {/* eslint-disable-next-line */}
        <a className="register-login" onClick={showLogin}>
          Login here
        </a>
        &nbsp;instead.
      </Message>
    </div>
  );
}

export default Register;