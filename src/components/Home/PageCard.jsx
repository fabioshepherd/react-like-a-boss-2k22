import styled from '@emotion/styled';
import { ButtonBase, Chip, Grid, Typography } from '@mui/material';

const MenuContainer = styled(ButtonBase)(() => ({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  boxShadow: '0px 0px 32px 0px rgba(0,0,0,0.11)',
  padding: '80px 40px',
  display: 'flex',
  flexDirection: 'column',
}));

const PageCard = ({ label, onClick, badges }) => {
  return (
    <MenuContainer onClick={onClick}>
      <Typography variant='h4'>{label}</Typography>
      <Grid container spacing={1} justifyContent='center'>
        {badges?.map((badge, i) => (
          <Grid item key={i}>
            <Chip label={badge} size='small' />
          </Grid>
        ))}
      </Grid>
    </MenuContainer>
  );
};

export default PageCard;
