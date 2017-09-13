import knex from './config';

function getPaper(id:number){
    return knex.select('paper.name','paper.id').from('paper')
        .join('itemPaper','paper.id','itemPaper.paperId')
        .join('items','itemPaper.itemId','items.id')
        .where('items.id', id)
        .orderBy('paper.name')
        .catch((error) => {
            return error
        });
}


export {getPaper}