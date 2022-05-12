import styled from '@emotion/styled';
import { Height, Scale } from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FrontBackPokemonImg from '../components/Pokemon/FrontBackPokemonImg';
import { getPokemonByNumber } from '../services/pokemonService';

const PokemonDetailContainerGrid = styled(Grid)(() => ({
  padding: '32px',
  boxShadow: '0px 0px 32px 0px rgba(0,0,0,0.11)',
  borderRadius: '32px',
  marginTop: '32px',
}));

const PokemonImageGrid = styled(Grid)(() => ({
  '& img': {
    width: '100%',
  },
}));

const PokemonInfoGrid = styled(Grid)(() => ({
  padding: '0 16px',
  '& .pokemon-name': {
    textTransform: 'capitalize',
    fontWeight: 800,
  },
  '& .pokemon-type': {
    textTransform: 'uppercase',
    fontWeight: 800,
    marginRight: '4px',
  },
  '& .info': {
    fontWeight: 700,
  },
  '& .info-icon': {
    verticalAlign: 'middle',
    marginRight: '4px',
  },
}));

const PokemonDetailPage = () => {
  const { number } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const pokemonResponse = await getPokemonByNumber(number);

      setPokemon(pokemonResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        'Caricamento...'
      ) : (
        <>
          <PokemonDetailContainerGrid container justifyContent='center'>
            <PokemonImageGrid item xs={4}>
              <img
                src={
                  pokemon?.sprites?.other?.['official-artwork']?.front_default
                }
              />
            </PokemonImageGrid>
            <PokemonInfoGrid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant={'h4'} className='pokemon-name'>
                    {pokemon?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {pokemon?.types.map((el, i) => (
                    <Chip label={el.type.name} className='pokemon-type' />
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Height className='info-icon' /> height:
                  <span className='info'> {`${pokemon?.height * 10}cm`}</span>
                </Grid>
                <Grid item xs={3}>
                  <Scale className='info-icon' /> weight:
                  <span className='info'> {`${pokemon?.weight / 10}kg`}</span>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid xs={2}>
                      <FrontBackPokemonImg
                        frontImg={pokemon?.sprites?.front_default}
                        backImg={pokemon?.sprites?.back_default}
                      />
                    </Grid>
                    <Grid xs={2}>
                      <FrontBackPokemonImg
                        frontImg={pokemon?.sprites?.front_shiny}
                        backImg={pokemon?.sprites?.back_shiny}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PokemonInfoGrid>
          </PokemonDetailContainerGrid>
        </>
      )}
    </>
  );
};

export default PokemonDetailPage;
