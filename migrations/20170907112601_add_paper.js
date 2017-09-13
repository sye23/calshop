exports.up = function(knex, Promise) {
    return knex.schema.createTable('paper', table => {
        table.increments('id').primary();
        table.string('name').unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('paper');
};