import knex from './config';

function getFonts(){
    return knex('font').orderBy('name').catch((error) => {
        return error
    });
}

export {getFonts}