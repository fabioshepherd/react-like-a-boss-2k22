import styled from '@emotion/styled';
import { useState } from 'react';

const StyledImg = styled.img(() => ({
  height: '100%',
  width: '100%',
  objectFit: 'contain',
}));

const FrontBackPokemonImg = ({ frontImg, backImg }) => {
  const [src, setSrc] = useState(frontImg);

  return (
    <StyledImg
      src={src}
      onMouseEnter={() => {
        setSrc(backImg);
      }}
      onMouseLeave={() => {
        setSrc(frontImg);
      }}
    />
  );
};

export default FrontBackPokemonImg;
