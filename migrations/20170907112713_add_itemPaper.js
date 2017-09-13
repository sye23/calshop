exports.up = function(knex, Promise) {
    return knex.schema.createTable('itemPaper', table => {
        table.increments('id').primary();
        table.integer('itemId').unsigned().index().references('id').inTable('items');
        table.integer('paperId').unsigned().index().references('id').inTable('paper');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itemPaper');
};