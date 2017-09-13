import knex from './config';

function getColor(id:number){
    return knex.select('color.name', 'color.id').from('color')
        .join('itemColor','color.id','itemColor.colorId')
        .join('items','itemColor.itemId','items.id')
        .where('items.id', id)
        .orderBy('color.name')
        .catch((error) => {
            return error
        });
}


export {getColor}
