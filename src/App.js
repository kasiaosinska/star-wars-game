import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompareCards from './components/CompareCards';
import { Button, Grid } from '@material-ui/core';
import { fetchAllPlayers } from './api';

const Wrapper = styled.div`
  margin: 50px;
`;

const getRandomInt = max => {
  return Math.floor(Math.random() * max) + 1;
};

function App() {
  const [unableButton, setUnableButton] = useState(true);
  const [peopleCount, setPeopleCount] = useState();
  const [playersId, setPlayersId] = useState([]);
  const [fetchPlayers, setFetchPlayers] = useState(false);

  useEffect(() => {
    fetchAllPlayers('people')
      .then(response => {
        if (response.ok) {
          setUnableButton(false);
        }
        return response.json();
      })
      .then(result => setPeopleCount(result.count))
      .catch(error => console.log(error));
  }, []);

  const handleClick = () => {
    const playerOne = getRandomInt(peopleCount);
    let playerTwo;

    do {
      playerTwo = getRandomInt(peopleCount);
    } while (playerTwo === playerOne);

    setPlayersId([playerOne, playerTwo]);
    setFetchPlayers(true);
  };

  return (
    <Wrapper>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          disabled={unableButton}
          onClick={handleClick}
        >
          Play Game
        </Button>
        {fetchPlayers && (
          <CompareCards playersId={playersId} fetchPlayers={fetchPlayers} />
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
