import styled from '@emotion/styled';
import { ButtonBase, Chip, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';
import PageCard from '../components/Home/PageCard';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={'Ciao Ajeje!'} />
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={6} sm={4}>
          <PageCard
            label={'Gif'}
            badges={['axios', 'useState()', 'useEffect()', 'uncontrolled form']}
            onClick={() => {
              navigate('gifs');
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <PageCard
            label={'Pokemon'}
            badges={['axios', 'useState()', 'useParams()']}
            onClick={() => {
              navigate('pokemon');
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <PageCard
            label={'Video'}
            badges={['useRef()', 'useState()', 'video']}
            onClick={() => {
              navigate('video');
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
