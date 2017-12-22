const nodemailer = require('nodemailer');
const config = require('../config.json');
const ModelsEmail = require('../models/sendEmail');


module.exports.getIndex = function (req, res) {
    res.render('pages/contact-me', { title: 'Cвязаться со мной' });
}
module.exports.sendEmail = function(req,res,next){
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
    }
    
    ModelsEmail(req.body.name,req.body.email,req.body.message,function(err){
        if(err !== null){
            return res.json({mes:'Письмо не отправлено',status:'Error'});
        }

        return res.json({mes:'Сообщение отправлено! ', status:'OK'});
    })
        
}