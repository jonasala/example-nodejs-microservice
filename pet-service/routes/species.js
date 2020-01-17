const Router = require('@koa/router');
const species = require('../repository/species');

const router = new Router();

router
  .param('species', async (id, ctx, next) => {
    ctx.species = await species.get(id);
    if (!ctx.species) {
      ctx.status = 404;
      return;
    }
    await next();
  })
  .get('/:species', ctx => {
    ctx.body = ctx.person;
  })
  .put('/:species', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    [ctx.body] = await species.update(ctx.species.id, newData);
  })
  .delete('/:species', async ctx => {
    const count = await species.delete(ctx.species.id);
    ctx.status = count > 0 ? 200 : 404;
  })
  .get('/', async ctx => {
    ctx.body = await species.list();
  })
  .post('/', async ctx => {
    const newData = ctx.request.body;
    if (newData.id) {
      delete newData.id;
    }

    [ctx.body] = await species.create(newData);
  });

module.exports = router;
