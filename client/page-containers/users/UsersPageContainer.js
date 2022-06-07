import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useGetUsers from '../../hooks/useGetUsers';
import UserListPageView from '../../components/user-list/UserListPageView';

const UsersPageContainer = () => {
  const Router = useRouter();
  const [stateAddUser, setStateAddUser] = useState(false);
  const [adminProfile, setAdminProfile] = useState('');
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { users } = useGetUsers();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('refreshed for update data');
      window.location.reload();
    }, 90000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('userprofile');
    setAdminProfile(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userprofile');

    Router.push('/');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios
        .delete(`http://localhost:5000/users/${id}`, {
          params: { id },
          headers: { 'x-access-token': token },
        })
        .then((res) => Router.reload(window.location.pathname))
        .catch((error) => {
          console.log(error, 'error');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setStateAddUser(!stateAddUser);
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleAddUser = async (e) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(state),
      });
      const resjson = await res.json();
      if (resjson.id) {
        Router.push({ pathname: '/users', query: {} });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newProps = {
    stateAddUser,
    adminProfile,
    state,
    users,
    handleLogout,
    handleDelete,
    handleAdd,
    handleChange,
    handleAddUser,
  };
  return <UserListPageView {...newProps} />;
};

export default UsersPageContainer;
