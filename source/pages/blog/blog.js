import './blog.scss';
import 'normalize.css';

import createMenu from '../menu/menu';
var menu = createMenu(['Home', 'About', 'Portfolio', 'Contacts'], 'menu');

document.body.appendChild(menu);
console.log('blog page');