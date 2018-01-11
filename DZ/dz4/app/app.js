const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');
const Pug = require('koa-pug');
const koaBody = require('koa-body');
const ModelsEmail = require('./models/sendEmail');
const fs = require('fs');
const path = require('path');
const db = require('./models/db')();

console.log(void 0);

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  };
app.keys = ['secret', 'key'];
app.use(session(CONFIG, app));
  

app.use(serve(__dirname + '/public'));

const mainPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/index', { title: 'Главная страница' });
};
const loginPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/login', { title: 'Авторизация' });
}
const contactMePage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/contact-me', { title: 'Связаться со мной' });
}
const myWorkPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/my-work', { title: 'Мои работы', isAdmin: ctx.session.login , pic: db.stores.file.store });
}

router.get('/', mainPage);
router.get('/login', loginPage);
router.post('/login', koaBody(), async ctx => {
    if(ctx.request.body.login === 'admin' && ctx.request.body.password === 'admin'){
        ctx.session.login = true;
        return (ctx.body = {msg:'Авторизация успешна', status: 'OK'});
    }else{
        ctx.session.login = true;
        return (ctx.body = {msg:'Логин и/или пароль введены не верно!', status: 'Error'});
    }
});
router.get('/contact-me', contactMePage);
router.post('/contact-me', koaBody(), async ctx => {
    if (
        !ctx.request.body.name ||
        !ctx.request.body.email ||
        !ctx.request.body.message
    ) {
        return (ctx.body = { mes: 'Все поля нужно заполнить!', status: 'Error' });
    }

    let send = await ModelsEmail(
        ctx.request.body.name,
        ctx.request.body.email,
        ctx.request.body.message
    );

    if (send !== void 0) {
        return (ctx.body = { mes: 'Письмо не отправлено', status: 'Error' });
    } else {
        ctx.body = { mes: 'Сообщение отправлено! ', status: 'OK' };
    }
});
router.get('/my-work', myWorkPage);

app.use(router.routes());

app.listen(4100, function () {
    console.log('Server running on https://localhost:3000')
});
