import knex from './config';

function getFonts(id:number){
    return knex.select('font.name','font.id').from('font')
    .join('itemFont','font.id','itemFont.fontId')
    .join('items','itemFont.itemId','items.id')
    .where('items.id', id)
    .orderBy('font.name')
    .catch((error) => {
        return error
    });
}

export {getFonts}