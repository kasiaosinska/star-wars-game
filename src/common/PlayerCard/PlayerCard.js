import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Wrapper } from './styled';

const PlayerCard = ({ winner, name }) => {
  return (
    <Wrapper winner={winner}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

PlayerCard.propsTypes = {
  winner: PropTypes.bool,
  name: PropTypes.string,
};

export default PlayerCard;
