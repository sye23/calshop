exports.up = function(knex, Promise) {
    return knex.schema.createTable('itemColor', table => {
        table.increments('id').primary();
        table.integer('itemId').unsigned().index().references('id').inTable('items');
        table.integer('colorId').unsigned().index().references('id').inTable('color');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itemColor');
};