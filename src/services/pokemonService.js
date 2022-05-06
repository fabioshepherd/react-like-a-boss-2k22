import axios from 'axios';

export const getPokemon = async (limit) => {
  const pokemonResponse = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/',
    {
      params: {
        limit,
      },
    }
  );

  return pokemonResponse;
};
