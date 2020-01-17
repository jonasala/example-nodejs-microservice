const Koa = require('koa');
const Router = require('@koa/router');
const BodyParser = require('koa-bodyparser');
const SpeciesRouter = require('./routes/species');
const PetsRouter = require('./routes/pets');

const app = new Koa();
app.use(BodyParser());
const router = new Router();

router.use('/species', SpeciesRouter.routes());
router.use('/pets', PetsRouter.routes());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
