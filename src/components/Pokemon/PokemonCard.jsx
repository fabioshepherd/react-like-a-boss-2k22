import { Grid, Typography } from '@mui/material';

const PokemonCard = ({ number, name, onClick }) => {
  return (
    <Grid
      container
      direction='column'
      alignItems={'center'}
      sx={{
        padding: '16px 8px',
        boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.1)',
        borderRadius: '16px',
      }}
      onClick={onClick}
    >
      <Grid item xs='auto' sx={{ marginBottom: '8px' }}>
        <Typography variant='h5'>{number}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PokemonCard;
