const Koa = require('koa');
const app = new Koa();

app.use( async(ctx, next)=>{
    ctx.body = 'Hello world!';
});

app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
});