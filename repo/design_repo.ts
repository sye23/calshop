import knex from './config';

function getDesigns(){
    return knex('design').orderBy('name').catch((error) => {
        return error
    });
}

export {getDesigns}