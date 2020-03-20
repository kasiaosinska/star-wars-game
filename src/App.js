import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompareCards from './components/CompareCards';
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { fetchAllPlayers } from './api';

const Wrapper = styled.div`
  margin: 50px;
`;

const WrapperWithMargin = styled.div`
  margin: 20px;
`;

const getRandomInt = max => {
  return Math.floor(Math.random() * max) + 1;
};

function App() {
  const [disabledButton, setDisabledButton] = useState(true);
  const [buttonText, setButtonText] = useState('Play Game');
  const [peopleCount, setPeopleCount] = useState();
  const [playersId, setPlayersId] = useState([]);
  const [fetchPlayers, setFetchPlayers] = useState(false);
  const [score, setScore] = useState();
  const [type, setType] = useState('people');

  useEffect(() => {
    fetchAllPlayers(type)
      .then(response => {
        if (response.ok) {
          setDisabledButton(false);
        }
        return response.json();
      })
      .then(result => setPeopleCount(result.count))
      .catch(error => console.log(error));
  }, [type]);

  const handleScore = score => setScore(score);

  const handleClick = () => {
    const playerOne = getRandomInt(peopleCount);
    let playerTwo;

    do {
      playerTwo = getRandomInt(peopleCount);
    } while (playerTwo === playerOne);

    setPlayersId([playerOne, playerTwo]);
    setButtonText('Play Again');
    setFetchPlayers(true);
    handleScore();
  };

  const handleChange = e => {
    setType(e.target.name);
  };

  return (
    <Wrapper>
      <Grid container justify="center" spacing={4}>
        <Grid container justify="center">
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose Battle</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type === 'people'}
                    onChange={handleChange}
                    name="people"
                  />
                }
                label="People"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type === 'starships'}
                    onChange={handleChange}
                    name="starships"
                  />
                }
                label="Starships"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <WrapperWithMargin>
          <Button
            variant="contained"
            color="primary"
            disabled={disabledButton}
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </WrapperWithMargin>
        <WrapperWithMargin>
          <Typography component="p">
            Score: {score?.one || 0} : {score?.two || 0}
          </Typography>
        </WrapperWithMargin>
        {fetchPlayers && (
          <CompareCards
            type={type}
            playersId={playersId}
            fetchPlayers={fetchPlayers}
            handleSetScore={handleScore}
          />
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
