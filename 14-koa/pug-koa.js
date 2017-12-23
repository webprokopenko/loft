const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');
const Pug = require('koa-pug');

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(serve(__dirname + '/public'));

const mainPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('index');
};

router.get('/', mainPage);

router.get('/users', async (ctx, next) => {
    ctx.body = "Hello world";
});

router.post('/users', async (ctx, next) => {

});

router.put('/users', async (ctx, next) => {
});

router.delete('/users', async (ctx, next) => {

});

router.get("/users/:admin/:id", async (ctx, next) => {
    ctx.body = ctx.params.admin + ctx.params.id;
});

app.use(router.routes());

app.listen(3000, function () {
    console.log('Server running on https://localhost:3000')
});
