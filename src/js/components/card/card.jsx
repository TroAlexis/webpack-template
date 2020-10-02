import React from 'react';

import './card.scss';

export const Card = (props) => pug`
  div.card-container
    img(alt="monster" src=${`https://robohash.org/${props.monster.id}?set=set2&size=180x180`})
    h2= props.monster.name
    p= props.monster.email
`;