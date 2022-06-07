import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginView from '../../components/login/Login';

function LoginPageContainer() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const Router = useRouter();

  const handleChange = (event) => {
    const value = event.target.value;

    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const resjson = await res.json();
      if (resjson.status === 400) {
        setOpenSnackbar(!openSnackbar);
        setErrorMessage(resjson.message);
        return;
      }
      localStorage.setItem('token', resjson.accessToken);
      localStorage.setItem('userprofile', resjson.first_name);

      Router.push('/users');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(!openSnackbar);
  };

  const props = {
    openSnackbar,
    state,
    errorMessage,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  };
  return <LoginView {...props} />;
}

export default LoginPageContainer;
