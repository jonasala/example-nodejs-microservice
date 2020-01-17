exports.up = knex => {
  return knex.schema.createTable('pets', table => {
    table.increments('id');
    table.string('name', 80).notNullable();
    table.integer('owner_id').notNullable();
    table.integer('species_id').notNullable();
    table.string('color', 20);
    table.decimal('weight');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('pets');
};
