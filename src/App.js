import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles/styles.css';

const StyledContainer = styled(Container)(() => ({
  paddingTop: '80px',
  height: '100%',
}));

const HeaderGrid = styled(Grid)(() => ({
  height: '80px',
  backdropFilter: 'blur(2px)',
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
  return (
    <StyledContainer>
      <HeaderGrid container alignItems={'center'} justifyContent='center'>
        <Grid item>React like a BOSS! 2K22</Grid>
      </HeaderGrid>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='expenses' element={<Expenses />} />
        <Route path='invoices' element={<Invoices />} /> */}
      </Routes>
    </StyledContainer>
  );
}

export default App;
