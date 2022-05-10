import axios from 'axios';

const key = 'OTWW1XT3O4FI';

export const getGifs = async (q, limit) => {
  const gifResponse = await axios.get('https://g.tenor.com/v1/search', {
    params: {
      q,
      limit,
      key,
    },
  });

  return gifResponse;
};

export const getRandomGifs = async (q, limit) => {
  const gifResponse = await axios.get('https://g.tenor.com/v1/random', {
    params: {
      q,
      limit,
      key,
    },
  });

  return gifResponse;
};
