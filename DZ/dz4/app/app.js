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
    ctx.body = pug.render('pages/index',{ title: 'Главная страница' });
};
const loginPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/login',{ title: 'Авторизация' });
}
const contactMePage = ctx =>{
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/contact-me',{ title: 'Связаться со мной' });
}
const myWorkPage = ctx =>{
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/my-work',{ title: 'Мои работы' });
}

router.get('/', mainPage);
router.get('/login', loginPage);
router.get('/contact-me',contactMePage);
router.get('/my-work',myWorkPage);

app.use(router.routes());

app.listen(4100, function () {
    console.log('Server running on https://localhost:3000')
});
