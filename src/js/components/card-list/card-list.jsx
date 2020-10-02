import React from 'react';

import { Card } from 'Components/card/card.jsx';

import './card-list.scss';

export const CardList = (props) => pug`
  div.card-list
    each monster in ${props.monsters}
      Card(key=monster.id monster=monster)
`;
