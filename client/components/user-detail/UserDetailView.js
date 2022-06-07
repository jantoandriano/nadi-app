import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

const UserDetailView = ({ userDetail }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Card sx={{ width: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="350"
              width="300"
              image="https://source.unsplash.com/random"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userDetail?.first_name} {userDetail?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetail?.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetailView;
