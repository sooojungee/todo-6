import { div, button } from '../utils/element';
import '../../scss/list.scss';
import '../../scss/cardInput.scss';
import { initCard } from './card';
import { createCardBtnHandler } from '../controller/createCardHandler';
import ListHandler, { listOnMouseDownHandler } from '../controller/listHandler';
import { showListModalHandler } from '../controller/listModalHandler';
import CardHandler from '../controller/cardHandler';

export const initList = (data) => {
    const userData = data;
    const listHandler = new ListHandler();
    const cardHandler = new CardHandler();
    const list = div({
        className: 'list',
        dataset: { listid: userData.listID, type: 'list' },
        onmousedown: listHandler.onMouseDown,
        onmouseover: listHandler.onMouseOver,
        onclick: cardHandler.clickCardDelBtn,
    },
    div({ className: 'list-header-section' },
        div({ className: 'list-header-left-wrap' },
            div({ className: 'cards-count' }, userData.cards.length),
            div({ className: 'list-title', ondblclick: showListModalHandler }, userData.listName)),
        div({ className: 'list-header-right-wrap' },
            button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
            button({ className: 'list-delete-btn', onclick: listHandler.clickDeleteList }, '✘'))),
    div({ className: 'list-body-section' },
        div(
<<<<<<< HEAD
            { className: 'cards-wrap', dataset: { wrapid: userData.listID } }, initCard(userData.listID, userData.cards),
=======
            { className: 'cards-wrap', dataset: { wrapid: userData.listID } }, initCard(userData),
>>>>>>> 0187b3b6505910ef032bfbb109556c8f5aa20178
        )));

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list-btn');
    listsWrap.insertBefore(list, addList);
};

export default initList;
