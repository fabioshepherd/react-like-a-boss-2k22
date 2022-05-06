import styled from '@emotion/styled';
import { Grid, Paper, Typography } from '@mui/material';

const UserImg = styled.img(() => ({
  width: 120,
  height: 120,
  borderRadius: '100%',
}));

const UserCard = ({ avatar, firstName, lastName, email }) => {
  return (
    <Grid
      container
      direction='column'
      alignItems={'center'}
      sx={{
        padding: '16px 8px',
        boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.1)',
        borderRadius: '16px',
      }}
    >
      <Grid item xs='auto' sx={{ marginBottom: '16px' }}>
        <UserImg src={avatar} />
      </Grid>
      <Grid item>
        <Typography variant='h6'>
          {firstName} {lastName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h7'>{email}</Typography>
      </Grid>
    </Grid>
  );
};

export default UserCard;
