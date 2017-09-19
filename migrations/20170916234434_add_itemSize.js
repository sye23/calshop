exports.up = function(knex, Promise) {
    return knex.schema.createTable('itemSize', table => {
        table.increments('id').primary();
        table.integer('itemId').unsigned().index().references('id').inTable('items');
        table.integer('sizeId').unsigned().index().references('id').inTable('size');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itemSize');
};