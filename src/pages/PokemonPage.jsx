import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import PokemonCard from '../components/Pokemon/PokemonCard';
import { getPokemonList } from '../services/pokemonService';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const limit = 400;
      const pokemonResponse = await getPokemonList(limit);

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
              <PokemonCard
                name={pokemon.name}
                number={i + 1}
                key={i}
                onClick={() => {
                  navigate(`${i * 1 + 1}`);
                }}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PokemonPage;
