// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { CardList } from 'Components/card-list/card-list.jsx';
import { SearchBox } from 'Components/search-box/search-box.jsx';

import 'Scss/index.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => monster.name
      .toLowerCase()
      .includes(searchField.toLowerCase()));
    // eslint-disable-next-line no-undef
    return pug`
      SearchBox(
      placeholder="search monsters"
      handleChange=this.handleChange
      )
      CardList(monsters=${filteredMonsters})   
    `;
  }
}

export default App;

const wrapper = document.querySelector('.root');
// eslint-disable-next-line no-unused-expressions,no-undef
wrapper ? ReactDOM.render(pug`App`, wrapper) : false;
