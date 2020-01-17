const knex = require('../db');

module.exports = {
  get(id) {
    return knex('people')
      .where({ id })
      .first();
  },
  list() {
    return knex('people');
  },
  update(id, data) {
    return knex('people')
      .where({ id })
      .update(data, '*');
  },
  create(data) {
    return knex('people').insert(data, '*');
  },
  delete(id) {
    return knex('people')
      .where({ id })
      .del();
  }
};
