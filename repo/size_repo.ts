import knex from './config';

function getSize(id: number){
    return knex.select('size.name','size.id').from('size')
    .join('itemSize','size.id','itemSize.sizeId')
    .join('items','itemSize.itemId','items.id')
    .where('items.id', id)
    .orderBy('size.name')
    .catch((error) => {
        return error
    });
}

export {getSize}