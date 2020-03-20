import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import PlayerCard from '../../common/PlayerCard';
import { fetchPlayer } from '../../api';
import Loader from '../../common/Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
`;

const CompareCards = ({ playersId, type, fetchPlayers, handleSetScore }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [tie, setTie] = useState(false);
  const [score, setScore] = useState({ one: 0, two: 0 });

  const attribute = type === 'people' ? 'height' : 'crew';

  useEffect(() => {
    setIsLoading(true);
    setTie(false);
    if (fetchPlayers) {
      Promise.all(playersId.map(id => fetchPlayer(type, id))).then(response => {
        setIsLoading(false);
        if (response[0][attribute] === response[1][attribute]) {
          setTie(true);
          return setPlayers(response);
        } else if (
          response[0][attribute] === 'unknown' ||
          response[1][attribute] === 'unknown'
        ) {
          return setPlayers(response);
        } else if (
          parseInt(response[0][attribute]) > parseInt(response[1][attribute])
        ) {
          response[0].winner = true;
          setScore(prevScore => ({
            one: prevScore.one + 1,
            two: prevScore.two,
          }));
          return setPlayers(response);
        }
        response[1].winner = true;
        setScore(prevScore => ({ one: prevScore.one, two: prevScore.two + 1 }));
        return setPlayers(response);
      });
    }
    handleSetScore(score);
  }, [fetchPlayers, playersId]);

  return (
    <Grid container justify="center">
      {tie && (
        <Wrapper>
          <Typography variant="h5">Tie</Typography>
        </Wrapper>
      )}
      {!isLoading ? (
        <Grid container justify="center" spacing={4}>
          {players.map(player => (
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
  type: PropTypes.string,
  fetchPlayers: PropTypes.bool,
};

export default CompareCards;
