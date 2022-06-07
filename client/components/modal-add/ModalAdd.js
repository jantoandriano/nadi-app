import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalAdd = (props) => {
  const { stateAddUser, handleAdd, state, handleChange, handleAddUser } = props;
  return (
    <>
      <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>
        Add
      </Button>
      <Modal
        open={stateAddUser}
        onClose={handleAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs" sx={{ marginTop: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleAddUser}
                sx={{ mt: 3 }}
              >
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
                  onClick={handleAddUser}
                >
                  Add
                </StyledButton>
              </Box>
            </Box>

            {/* <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Alert severity="success">Success</Alert>
            </Snackbar> */}
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAdd;
