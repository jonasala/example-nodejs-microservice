const crud = require('./crud');

const columns = {
  id: 'pets.id',
  name: 'pets.name',
  species_id: 'pets.species_id',
  species_name: 'species.name',
  owner_id: 'pets.owner_id',
  color: 'pets.color',
  weight: 'pets.weight'
};

module.exports = {
  get(id) {
    const q = crud.get('pets', id);
    return q.innerJoin('species', 'pets.species_id', 'species.id').column(columns);
  },
  list(filters) {
    const q = crud.list('pets');

    if (filters.owner_id) {
      q.where('pets.owner_id', filters.owner_id);
    }

    return q.innerJoin('species', 'pets.species_id', 'species.id').columns(columns);
  },
  async update(id, data) {
    await crud.update('pets', id, data);
    return crud.get('pets', id);
  },
  async create(data) {
    const [pet] = await crud.create('pets', data);
    return crud.get('pets', pet.id);
  },
  delete(id) {
    return crud.delete('pets', id);
  }
};
