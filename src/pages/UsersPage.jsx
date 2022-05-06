import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import UserCard from '../components/Users/UserCard';
import { getRandomUsers } from '../services/userService';

const WelcomeImg = styled.img(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  objectFit: 'cover',
  boxShadow: '0px 0px 21px 0px rgba(0,0,0,0.2)',
}));

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    try {
      const usersLimit = 30;
      const usersResponse = await getRandomUsers(usersLimit);

      setUsers(usersResponse.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title={'Random Users!'} />
      <Grid container spacing={3} justifyContent='center'>
        {users.length > 0 &&
          users.map((user, i) => (
            <Grid item xs={6} sm={4} key={i}>
              <UserCard
                firstName={user.name.first}
                lastName={user.name.last}
                avatar={user.picture.large}
                email={user.email}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default UsersPage;
