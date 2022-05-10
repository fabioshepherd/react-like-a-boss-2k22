import styled from '@emotion/styled';
import {
  Search,
  Whatshot,
  WhatshotOutlined,
  Shuffle,
  ShuffleOn,
  Loop,
} from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import { getRandomGifs, getGifs } from '../services/gifService';

const GifImg = styled.img(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  objectFit: 'cover',
  boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.1)',
}));

const LoadingIcon = styled(Loop)(() => ({
  animation: 'rotation 5s infinite linear',
  verticalAlign: 'middle',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(359deg)',
    },
    to: {
      transform: 'rotate(0deg)',
    },
  },
}));

const GifPage = () => {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async (keyword, random, limit) => {
    try {
      setIsLoading(true);
      const searchBy = keyword || 'baby yoda';
      const gifLimit = limit || 50;
      const isRandom = random || false;

      let gifResponse;
      if (isRandom) {
        gifResponse = await getRandomGifs(searchBy, gifLimit);
      } else {
        gifResponse = await getGifs(searchBy, gifLimit);
      }

      setGifs(gifResponse.data?.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    prepareData(
      e.target.keyword.value,
      e.target.random.checked,
      e.target.limit.value * 1
    );
  };

  return (
    <>
      <PageTitle title={'Random Gifs!'} />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justifyContent='center'
          sx={{ marginBottom: '40px' }}
        >
          <Grid item>
            <TextField
              label='Keyword'
              variant='outlined'
              name='keyword'
              required
              autoFocus
            />
          </Grid>
          <Grid item>
            <TextField
              label='Limit'
              variant='outlined'
              name='limit'
              type='number'
              inputProps={{ min: 0, max: 50 }}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name='random'
                  icon={<Shuffle />}
                  checkedIcon={<ShuffleOn />}
                />
              }
              label='Random Order'
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              type='submit'
              startIcon={isLoading ? <LoadingIcon /> : <Search />}
              size='large'
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

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
