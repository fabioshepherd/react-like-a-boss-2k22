import axios from 'axios';

export const getRandomGifs = async (q, limit) => {
  const key = 'OTWW1XT3O4FI';

  const gifResponse = await axios.get('https://g.tenor.com/v1/random', {
    params: {
      q,
      limit,
      key,
    },
  });

  return gifResponse;
};
