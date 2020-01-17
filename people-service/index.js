const Koa = require('koa');
const Router = require('@koa/router');
const BodyParser = require('koa-bodyparser');
const people = require('./repository/people');
const petsClient = require('./clients/pets');

const app = new Koa();
app.use(BodyParser());
const router = new Router();

router
  .param('id', async (id, ctx, next) => {
    ctx.person = await people.get(id);
    if (!ctx.person) {
      ctx.status = 404;
      return;
    }

    if (ctx.query.withPets) {
      ctx.person.pets = await petsClient.petList(ctx.person.id);
    }

    await next();
  })
  .get('/:id', ctx => {
    ctx.body = ctx.person;
  })
  .put('/:id', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    [ctx.body] = await people.update(ctx.person.id, newData);
  })
  .delete('/:id', async ctx => {
    const count = await people.delete(ctx.person.id);
    ctx.status = count > 0 ? 200 : 404;
  })
  .get('/', async ctx => {
    let peopleList = await people.list();
    if (ctx.query.withPets) {
      peopleList = await petsClient.loadPetList(peopleList);
    }
    ctx.body = peopleList;
  })
  .post('/', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    [ctx.body] = await people.create(newData);
  });

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
