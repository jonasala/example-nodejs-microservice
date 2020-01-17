exports.up = knex => {
  return knex.schema.createTable('people', table => {
    table.increments('id');
    table.string('name', 80).notNullable();
    table.string('email', 140).notNullable();
    table.string('phone', 15);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('people');
};
