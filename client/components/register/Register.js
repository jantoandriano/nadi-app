import * as React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link as MUILink } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

export default function Register(props) {
  const {
    state,
    openSnackbar,
    errorMessage,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  } = props;
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 2 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={state.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={state.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={state.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/">
                <MUILink variant="body2">
                  Already have an account? Sign in
                </MUILink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Container>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link href="/">
        <MUILink color="inherit">Your Website</MUILink>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
