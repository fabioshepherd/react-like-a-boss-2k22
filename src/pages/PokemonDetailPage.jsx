import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { getPokemon, getPokemonByNumber } from '../services/pokemonService';

const PokemonDetailPage = () => {
  const { number } = useParams();

  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const pokemonResponse = await getPokemonByNumber(number);

      setPokemon(pokemonResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title={'Pokemon!'} />
      <Grid container spacing={3} justifyContent='center'></Grid>
    </>
  );
};

export default PokemonDetailPage;
