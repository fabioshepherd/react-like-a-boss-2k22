import axios from 'axios';

export const getPokemonList = async (limit) => {
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

export const getPokemonByNumber = async (number) => {
  const pokemonResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${number}`
  );

  return pokemonResponse;
};
