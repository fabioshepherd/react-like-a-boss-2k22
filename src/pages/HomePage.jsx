import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';

const WelcomeImg = styled.img(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  objectFit: 'cover',
  boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.37)',
}));

const HomePage = () => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const searchBy = 'welcome';
      const apiKey = 'OTWW1XT3O4FI';
      const gifLimit = 3;

      const gifSearchUrl = `https://g.tenor.com/v1/random?q=${searchBy}&key=${apiKey}&limit=${gifLimit}`;
      const gifResponse = await axios.get(gifSearchUrl);

      setGifs(gifResponse.data?.results);
      console.log(gifResponse.data);
    } catch (error) {}
  };

  return (
    <>
      <PageTitle title={'Ciao!'} />
      <Grid container spacing={2}>
        {gifs.length > 0 &&
          gifs.map((gif, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={i}
              sx={{ aspectRatio: '1 / 1' }}
            >
              <WelcomeImg src={gif.media[0].mediumgif.url} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default HomePage;
