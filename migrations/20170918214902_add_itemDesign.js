exports.up = function(knex, Promise) {
    return knex.schema.createTable('itemDesign', table => {
        table.increments('id').primary();
        table.integer('itemId').unsigned().index().references('id').inTable('items');
        table.integer('designId').unsigned().index().references('id').inTable('design');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itemDesign');
};