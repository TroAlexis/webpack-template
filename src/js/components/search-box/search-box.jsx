import React from 'react';

import './search-box.scss';

export const SearchBox = ({ placeholder, handleChange }) => pug`
      input.search(
        type='search', 
        placeholder=${placeholder},
        onChange=${handleChange}
      )
  `;
