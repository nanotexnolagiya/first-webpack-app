import './menu.scss';
import 'normalize.css';

export default function (arr, className) {

    var menu = document.createElement('ul');
    menu.className = className;
    var listItems = '';

    arr.forEach( function(item) {
        listItems += '<li>'+item+'</li>';
    });

    menu.innerHTML = listItems;

    return menu;
}