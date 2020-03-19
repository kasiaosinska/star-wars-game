import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Wrapper } from './styled';

const PlayerCard = ({ winner, name, attribute }) => {
  return (
    <Wrapper winner={winner}>
      <Card justify="center">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Power: {attribute}
          </Typography>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

PlayerCard.propsTypes = {
  winner: PropTypes.bool,
  name: PropTypes.string,
  attribute: PropTypes.string,
};

export default PlayerCard;
