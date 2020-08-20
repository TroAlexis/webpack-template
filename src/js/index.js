// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

import logo from '../assets/img/logo.png';

console.log(logo, 'blaaa')

const img = document.createElement('img');
img.src = logo;
img.alt = '';
img.style.width = '100%';

console.log(img)

document.body.appendChild(img);