const axios = require('axios');

module.exports = {
  async get(id) {
    const response = await axios.get(`http://localhost:3001/${id}`);
    return response.data;
  },
  async loadPetOwner(pets) {
    const petsWithOwner = await Promise.all(
      pets.map(async pet => {
        const withOwner = pet;
        withOwner.owner = await this.get(pet.owner_id);
        return withOwner;
      })
    );
    return petsWithOwner;
  }
};
