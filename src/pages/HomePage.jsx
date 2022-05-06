import styled from '@emotion/styled';
import { ButtonBase, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';

const MenuContainer = styled(ButtonBase)(() => ({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  boxShadow: '0px 0px 32px 0px rgba(0,0,0,0.11)',
  padding: '160px 40px',
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={'Ciao mondo!'} />
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={6}>
          <MenuContainer
            onClick={() => {
              navigate('gifs');
            }}
          >
            <Typography variant='h3'>RANDOM GIFs</Typography>
          </MenuContainer>
        </Grid>
        <Grid item xs={6}>
          <MenuContainer
            onClick={() => {
              navigate('users');
            }}
          >
            <Typography variant='h3'>RANDOM USERs</Typography>
          </MenuContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
