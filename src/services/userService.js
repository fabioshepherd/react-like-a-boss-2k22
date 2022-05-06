import axios from 'axios';

export const getRandomUsers = async (results) => {
  const usersResponse = await axios.get('https://randomuser.me/api/', {
    params: {
      results,
    },
  });

  return usersResponse;
};
