const knex = require('../db');

module.exports = {
  get(table, id) {
    return knex(table)
      .where(`${table}.id`, id)
      .first();
  },
  list(table) {
    return knex(table);
  },
  update(table, id, data) {
    return knex(table)
      .where({ id })
      .update(data, '*');
  },
  create(table, data) {
    return knex(table).insert(data, '*');
  },
  delete(table, id) {
    return knex(table)
      .where({ id })
      .del();
  }
};
