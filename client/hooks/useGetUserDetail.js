import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetUserDetail(user_id) {
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      if (!token) {
        Router.push('/');
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${user_id}`,
          {
            headers: { 'x-access-token': token },
          }
        );
        if (response.status === 200) {
          setUserDetail(response.data);
        }
      } catch (error) {
        console.log('Error::useGetUserDetail::', error);
      }
    };
    fetchUser();
  }, [user_id]);

  return {
    userDetail,
  };
}

export default useGetUserDetail;
