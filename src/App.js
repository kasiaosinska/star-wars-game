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
  const [disabledButton, setDisabledButton] = useState(true);
  const [buttonText, setButtonText] = useState('Play Game')
  const [peopleCount, setPeopleCount] = useState();
  const [playersId, setPlayersId] = useState([]);
  const [fetchPlayers, setFetchPlayers] = useState(false);

  useEffect(() => {
    fetchAllPlayers('people')
      .then(response => {
        if (response.ok) {
          setDisabledButton(false);
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
    setButtonText('Play Again');
    setFetchPlayers(true);
  };

  return (
    <Wrapper>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          disabled={disabledButton}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
        {fetchPlayers && (
          <CompareCards playersId={playersId} fetchPlayers={fetchPlayers} />
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
