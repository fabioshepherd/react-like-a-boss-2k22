import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const PageTitleDiv = styled.div(() => ({
  padding: '16px 0',
  marginBottom: '24px',
}));

const PageTitle = ({ title }) => {
  return (
    <PageTitleDiv>
      <Typography variant={'h3'}>{title}</Typography>
    </PageTitleDiv>
  );
};

export default PageTitle;
