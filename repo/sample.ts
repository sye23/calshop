import knex from './config';

function getSample(id : number) {
    return knex('something').where('id', id);

}


export {getSample}
