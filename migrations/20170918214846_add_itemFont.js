exports.up = function(knex, Promise) {
    return knex.schema.createTable('itemFont', table => {
        table.increments('id').primary();
        table.integer('itemId').unsigned().index().references('id').inTable('items');
        table.integer('fontId').unsigned().index().references('id').inTable('font');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itemFont');
};