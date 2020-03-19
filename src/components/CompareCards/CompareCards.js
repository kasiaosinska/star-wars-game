import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import PlayerCard from '../../common/PlayerCard';
import { fetchPlayer } from '../../api';
import Loader from '../../common/Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 50px;
`;

const CompareCards = ({ playersId, type = 'people', fetchPlayers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [tie, setTie] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (fetchPlayers) {
      Promise.all(playersId.map(id => fetchPlayer(type, id))).then(response => {
        setIsLoading(false);
        if (response[0].height === response[1].height) {
          setTie(true);
          return setPlayers(response);
        } else if (
          response[0].height === 'unknown' &&
          response[1].height === 'unknown'
        ) {
          return setPlayers(response);
        } else if (
          parseInt(response[0].height) > parseInt(response[1].height)
        ) {
          response[0].winner = true;
          return setPlayers(response);
        }
        response[1].winner = true;
        return setPlayers(response);
      });
    }
  }, [fetchPlayers]);

  return (
    <Grid container justify="center">
      {tie && <Typography>Tie</Typography>}
      {!isLoading ? (
        <Grid container justify="center" spacing={4}>
          {players.map(player => (
            <Grid item key={player.url}>
              <PlayerCard name={player.name} winner={player.winner} />
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
  type: PropTypes.string,
  fetchPlayers: PropTypes.bool,
};

export default CompareCards;
