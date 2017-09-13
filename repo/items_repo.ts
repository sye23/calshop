import knex from './config';

function getItems(){
    return knex('items').orderBy('name').catch((error) => {
        return error
    });
}

export {getItems}
