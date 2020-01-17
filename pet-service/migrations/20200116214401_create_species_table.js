exports.up = knex => {
  return knex.schema.createTable('species', table => {
    table.increments('id');
    table.string('name', 80).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('species');
};
