import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import PokemonCard from '../components/Pokemon/PokemonCard';
import { getPokemon } from '../services/pokemonService';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const limit = 151;
      const pokemonResponse = await getPokemon(limit);

      setPokemons(pokemonResponse.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title={'Pokemon!'} />
      <Grid container spacing={3} justifyContent='center'>
        {pokemons.length > 0 &&
          pokemons.map((pokemon, i) => (
            <Grid item xs={4} sm={3} key={i}>
              <PokemonCard name={pokemon.name} number={i + 1} key={i} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PokemonPage;
