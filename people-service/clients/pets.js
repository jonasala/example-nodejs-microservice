const axios = require('axios');

module.exports = {
  async petList(id) {
    const response = await axios.get(`http://localhost:3000/pets/?owner_id=${id}`);
    return response.data;
  },
  async loadPetList(people) {
    const peopleWithPets = await Promise.all(
      people.map(async person => {
        const withPets = person;
        withPets.pets = await this.petList(person.id);
        return withPets;
      })
    );
    return peopleWithPets;
  }
};
