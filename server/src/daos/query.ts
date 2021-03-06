import {
    ICard, IEvent, IList, IUser, 
} from '@type';
import { getSqlTime, valueToString } from './util';

const query: {
    getUpdated: (name: string, id: number) => string
} = {
    getUpdated: (name, id) => `select updated from ${name} where ${name}ID = ${id} limit 1;`,
};

const textCheck = (text:string | undefined): string => {
    if(text) {
        return `,cardText="${text}"`;
    }
    return '';
};

const idCheck = (name: string, id:number | undefined): string => {
    if(id) {
        return `,${name}ID=${id}`;
    }
    return '';
};


export const userQuery: {
    getUserData: (id:number) => string,
    getUser: (id:string) => string,
    getUserID: (id:number) => string,
    add: (event: IUser) => string,

} = {
    getUserData: (id) => 'select '
        + 'list.listID, listName, user.userID, card.created, card.updated, cardID, cardText, orders '
        + 'from list '
            + 'left join user on list.userID = user.userID '
            + 'left join card on card.listID = list.listID '
            + `where user.userID = '${id}'`,
    getUser: (id) => `select * from user where user.id = '${id}'`,
    getUserID: (id) => `select * from user where user.userID = '${id}'`,
    add: (user) => 'insert into '
        + `user (${Object.keys(user)}, created) `
        + `values (${`${valueToString(Object.values(user))},'${getSqlTime()}'`});`,
};

export const eventQuery: {
    add: (event: IEvent) => string,
    getAll: () => string,
} = {
    add: (event) => 'insert into '
        + `log (${Object.keys(event)}, created) `
        + `values (${`${valueToString(Object.values(event))},'${getSqlTime()}'`});`
        + 'select * from log where logID=LAST_INSERT_ID();',
    getAll: () => 'select '
        + 'log.created, logID, log.eventTypeID, card, list, beforeList, typeName, name, id from log '
        + ' left join eventType on log.eventTypeID = eventType.eventTypeID'
        + ' left join user on log.userID = user.userID'
        + ' ORDER BY log.created DESC',
};

export const listQuery: {
    update: (list: IList) => string
    add: (list: IList) => string,
    delete: (listID: number) => string,
    updateOrder: (list: IList) => string
} = {
    update: (list) => `${'update list '
        + `set  listName="${list.listName}", updated="${getSqlTime()}"`
        + `where (listID=${list.listID});`}${
        query.getUpdated('list', list.listID as number)}`,
    add: (list) => 'insert into '
        + `list (${Object.keys(list)}, created, updated) `
        + `values (${`${valueToString(Object.values(list))},'${getSqlTime()}','${getSqlTime()}'`})`,
    delete: (listID) => `delete from list where listID = ${listID};`,
    updateOrder: (list: IList) => 'update list '
        + `set orders = '${list.orders}' `
        + `where listID=${list.listID}`,

};


export const cardQuery: {
    update: (card: ICard) => string
    add: (card: ICard) => string,
    delete: (cardID: number) => string,
} = {
    update: (card) => `${'update card '
        + `set updated="${getSqlTime()}", cardID=${card.cardID} ${idCheck('list', card.listID)} ${textCheck(card.cardText)} `
        + `where (cardID=${card.cardID});`}${
        query.getUpdated('card', card.cardID as number)}`,
    add: (card) => 'insert into '

        + `card(${Object.keys(card)}, created, updated) `
        + `values (${`${valueToString(Object.values(card))},'${getSqlTime()}','${getSqlTime()}'`})`,
    delete: (cardID) => `delete from card where cardID = ${cardID};`,
};

