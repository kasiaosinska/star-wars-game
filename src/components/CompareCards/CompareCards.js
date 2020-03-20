import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import PlayerCard from '../../common/PlayerCard';
import { fetchPlayer } from '../../api';
import Loader from '../../common/Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 15px;
`;

const CompareCards = ({ playerIds, resource, setScore }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [tie, setTie] = useState(false);

  const attribute = resource === 'people' ? 'height' : 'crew';

  useEffect(() => {
    setIsLoading(true);
    setTie(false);

    Promise.all(playerIds.map(id => fetchPlayer(resource, id))).then(
      response => {
        setIsLoading(false);

        const players = {};
        players.one = response[0];
        players.two = response[1];

        const playerOneAttribute = players.one[attribute];
        const playerTwoAttribute = players.two[attribute];

        let winner;

        if (playerOneAttribute === playerTwoAttribute) {
          setTie(true);
          return setPlayers(players);
        }

        if (playerOneAttribute === 'unknown' || playerTwoAttribute === 'unknown') {
          return setPlayers(players);
        }

        winner = parseInt(playerOneAttribute) > parseInt(playerTwoAttribute) ? 'one' : 'two';
        players[winner].winner = true;

        setScore(prevScore => ({
          ...prevScore,
          [winner]: prevScore[winner] + 1,
        }));

        return setPlayers(players);
      },
    );
  }, [playerIds]);

  return (
    <Grid container justify="center">
      {tie && (
        <Wrapper>
          <Typography variant="h5">Tie</Typography>
        </Wrapper>
      )}
      {!isLoading ? (
        <Grid container justify="center" spacing={4}>
          {Object.values(players).map(player => (
            <Grid item xs={12} sm={6} key={player.url}>
              <PlayerCard
                name={player.name}
                winner={player.winner}
                attribute={player[attribute]}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Wrapper>
          <Loader color="green" size={20} />
        </Wrapper>
      )}
    </Grid>
  );
};

CompareCards.propTypes = {
  playersId: PropTypes.array,
  resource: PropTypes.string,
  setScore: PropTypes.func,
};

export default CompareCards;
