module.exports.getIndex = function (req, res) {
    res.render('pages/login', { title: 'Авторизация' });
}
module.exports.postLogin = function(req,res){
    if(req.body.login === 'admin' && req.body.password === 'admin'){
        req.session.isAdmin = true;
        return res.json({msg:'Авторизация успешна', status: 'OK'});
    }
    return res.json({msg:'Логин и/или пароль введены не верно!', status: 'Error'});
}
module.exports.isAdmin = function(req,res,next){
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
      // то всё хорошо :)
      return next();
    }
    // если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/login');
}
