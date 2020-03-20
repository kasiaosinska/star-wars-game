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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Play Game');
  const [resourceCount, setResourceCount] = useState(null);
  const [playerIds, setPlayerIds] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const [score, setScore] = useState({ one: 0, two: 0 });
  const [resource, setResource] = useState('people');

  useEffect(() => {
    fetchAllPlayers(resource)
      .then(result => {
        setButtonDisabled(false);
        return setResourceCount(result.count);
      })
      .catch(error => console.log(error));
  }, [resource]);

  const handleClick = () => {
    let playerOne = getRandomInt(resourceCount);
    let playerTwo = getRandomInt(resourceCount);

    do {
      playerTwo = getRandomInt(resourceCount);
    } while (playerTwo === playerOne);

    setPlayerIds([playerOne, playerTwo]);
    setButtonText('Play Again');
    setShowPlayers(true);
  };

  const handleChange = event => {
    setResource(event.target.name);
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
                    checked={resource === 'people'}
                    onChange={handleChange}
                    name="people"
                  />
                }
                label="People"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resource === 'starships'}
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
            disabled={buttonDisabled}
            onClick={handleClick}
            data-testid="button"
          >
            {buttonText}
          </Button>
        </WrapperWithMargin>
        <WrapperWithMargin>
          <Typography component="p">
            Player One {score.one} : {score.two} Player Two
          </Typography>
        </WrapperWithMargin>
        {showPlayers && (
          <CompareCards
            resource={resource}
            playerIds={playerIds}
            setScore={setScore}
          />
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
