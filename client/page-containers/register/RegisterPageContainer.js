import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RegisterView from '../../components/register/Register';

function RegisterPageContainer() {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
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
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const resjson = await res.json();
      if (resjson.status >= 400 || resjson.status === undefined) {
        setOpenSnackbar(!openSnackbar);
        setErrorMessage(resjson.message);
        return;
      }
      Router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(!openSnackbar);
  };

  const props = {
    state,
    errorMessage,
    openSnackbar,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  };

  return <RegisterView {...props} />;
}

export default RegisterPageContainer;
