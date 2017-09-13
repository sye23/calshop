exports.up = function(knex, Promise) {
    return knex.schema.createTable('design', table => {
        table.increments('id').primary();
        table.string('name').unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('design');
};