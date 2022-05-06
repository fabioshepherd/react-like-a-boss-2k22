import styled from '@emotion/styled';
import { ButtonBase, Chip, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';

const MenuContainer = styled(ButtonBase)(() => ({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  boxShadow: '0px 0px 32px 0px rgba(0,0,0,0.11)',
  padding: '80px 40px',
  display: 'flex',
  flexDirection: 'column',
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={'Ciao mondo!'} />
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={6} sm={4}>
          <MenuContainer
            onClick={() => {
              navigate('gifs');
            }}
          >
            <Typography variant='h4'>RANDOM GIFs</Typography>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item>
                <Chip label='axios' size='small' />
              </Grid>
              <Grid item>
                <Chip label='useState()' size='small' />
              </Grid>
            </Grid>
          </MenuContainer>
        </Grid>
        <Grid item xs={6} sm={4}>
          <MenuContainer
            onClick={() => {
              navigate('users');
            }}
          >
            <Typography variant='h4'>RANDOM USERs</Typography>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item>
                <Chip label='axios' size='small' />
              </Grid>
              <Grid item>
                <Chip label='useState()' size='small' />
              </Grid>
            </Grid>
          </MenuContainer>
        </Grid>
        <Grid item xs={6} sm={4}>
          <MenuContainer
            onClick={() => {
              navigate('VIDEO');
            }}
          >
            <Typography variant='h4' component={'div'}>
              VIDEO
            </Typography>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item>
                <Chip label='useRef()' size='small' />
              </Grid>
              <Grid item>
                <Chip label='useState()' size='small' />
              </Grid>
              <Grid item>
                <Chip label='video' size='small' />
              </Grid>
            </Grid>
          </MenuContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
