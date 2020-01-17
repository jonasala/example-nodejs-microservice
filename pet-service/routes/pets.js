const Router = require('@koa/router');
const pets = require('../repository/pets');
const peopleClient = require('../clients/people');

const router = new Router();

router
  .param('pet', async (id, ctx, next) => {
    ctx.pet = await pets.get(id);
    if (!ctx.pet) {
      ctx.status = 404;
      return;
    }

    if (ctx.query.withOwner) {
      ctx.pet.owner = await peopleClient.get(ctx.pet.owner_id);
    }

    await next();
  })
  .get('/:pet', ctx => {
    ctx.body = ctx.pet;
  })
  .put('/:pet', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    ctx.body = await pets.update(ctx.pet.id, newData);
  })
  .delete('/:pet', async ctx => {
    const count = await pets.delete(ctx.pet.id);
    ctx.status = count > 0 ? 200 : 404;
  })
  .get('/', async ctx => {
    let petList = await pets.list(ctx.query);

    if (ctx.query.withOwner) {
      petList = await peopleClient.loadPetOwner(petList);
    }

    ctx.body = petList;
  })
  .post('/', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    ctx.body = await pets.create(newData);
  });

module.exports = router;
