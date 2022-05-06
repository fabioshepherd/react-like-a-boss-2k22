import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GifPage from './pages/GifPage';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import VideoPage from './pages/VideoPage';
import './styles/styles.css';

const StyledContainer = styled(Container)(() => ({
  paddingTop: '80px',
  height: '100%',
}));

const HeaderGrid = styled(Grid)(() => ({
  height: '80px',
  backdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  fontWeight: '500',
  fontSize: '40px',
  transition: 'all 100ms ease',
  ':hover': {
    fontSize: '48px',
    fontWeight: '700',
  },
}));

function App() {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <HeaderGrid container alignItems={'center'} justifyContent='center'>
        <Grid
          item
          onClick={() => {
            navigate('/');
          }}
        >
          React like a BOSS! 2K22
        </Grid>
      </HeaderGrid>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='gifs' element={<GifPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='video' element={<VideoPage />} />
      </Routes>
    </StyledContainer>
  );
}

export default App;
