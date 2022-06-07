import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const Router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      if (!token) {
        Router.push('/');
      }
      await axios
        .get('http://localhost:5000/users', {
          headers: { 'x-access-token': token },
        })
        .then((res) => setUsers(res.data.users))
        .catch((error) => {
          if (error.response.status && error.response.status >= 400) {
            Router.push('/');
          }
        });
    };
    fetchUsers();
  }, []);

  return {
    users,
  };
};

export default useGetUsers;
