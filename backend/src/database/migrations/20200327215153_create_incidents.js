
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        //primary key
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        table.string('ngo_id').notNullable();
        
        //foreign key
        table.foreign('ngo_id').references('id').inTable('ngos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
