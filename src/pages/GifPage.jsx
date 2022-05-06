import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import { getRandomGifs } from '../services/gifService';

const GifImg = styled.img(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  objectFit: 'cover',
  boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.1)',
}));

const GifPage = () => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const searchBy = 'welcome';
      const gifLimit = 100;

      const gifResponse = await getRandomGifs(searchBy, gifLimit);

      setGifs(gifResponse.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title={'Random Gifs!'} />
      <Grid container spacing={3} justifyContent='center'>
        {gifs.length > 0 &&
          gifs.map((gif, i) => (
            <Grid item xs={3} sm={2} key={i} sx={{ aspectRatio: '1 / 1' }}>
              <GifImg src={gif.media[0].mediumgif.url} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default GifPage;
