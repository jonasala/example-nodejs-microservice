const crud = require('./crud');

module.exports = {
  get(id) {
    return crud.get('species', id);
  },
  list() {
    return crud.list('species');
  },
  update(id, data) {
    return crud.update('species', id, data);
  },
  create(data) {
    return crud.create('species', data);
  },
  delete(id) {
    return crud.delete('species', id);
  }
};
