import React from 'react';
import Head from 'next/head';
import UserListTable from '../users-table/UserListTable';
import AddUser from '../modal-add/ModalAdd';
import { Typography, Container, Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

function UserListPageView(props) {
  const {
    stateAddUser,
    state,
    adminProfile,
    users,
    handleAdd,
    handleAddUser,
    handleChange,
    handleDelete,
    handleLogout,
  } = props;
  return (
    <>
      <Head>
        <title>My App - List</title>
      </Head>
      <Container sx={{ marginTop: 2 }}>
        <Typography variant="h4" align="center">
          User List Table
        </Typography>

        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={8}>
            <AddUser
              stateAddUser={stateAddUser}
              handleAdd={handleAdd}
              state={state}
              handleAddUser={handleAddUser}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ textTransform: 'capitalize' }}>
              Hi, {adminProfile}
            </Typography>
          </Grid>
        </Grid>
        <UserListTable data={users} handleDelete={handleDelete} />
        <Box sx={{ marginTop: '30px' }}>
          <Button color="error" onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default UserListPageView;
