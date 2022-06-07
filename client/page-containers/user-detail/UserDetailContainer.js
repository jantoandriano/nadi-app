import React from 'react';
import { useRouter } from 'next/router';
import UserDetailView from '../../components/user-detail/UserDetailView';
import useGetUserDetail from '../../hooks/useGetUserDetail';

function UserDetailContainer() {
  const Router = useRouter();
  const { id } = Router.query;
  const { userDetail } = useGetUserDetail(id);

  return <UserDetailView userDetail={userDetail} />;
}

export default UserDetailContainer;
