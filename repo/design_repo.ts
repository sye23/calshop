import knex from './config';

function getDesigns(id: number){
    return knex.select('design.name','design.id').from('design')
    .join('itemDesign','design.id','itemDesign.designId')
    .join('items','itemDesign.itemId','items.id')
    .where('items.id', id)
    .orderBy('design.name')
    .catch((error) => {
        return error
    });
}

export {getDesigns}