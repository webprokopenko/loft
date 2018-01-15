require('../../models/users');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports.saveUsers = function (req, res) {
    
    if (!req.body.username || !req.body.password || !req.body.firstName) {
        return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
    }
    
    try {
        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            surName: req.body.surName,
            access_token: '',
            img:'',
            permission:req.body.permission
        });
        newUser.setPassword(req.body.password);
        User.findOne({username: req.body.username}).then(u=>{        
            if(u){
                console.log('User exist');
                return res.json({msg:'Пользователь с таким именем уже существует', status: 'Error'});
            }
            console.log('NOt exist');
            try{
                newUser.save();
                console.log("Save done");
                return res.json(newUser);
            }catch(error){
                console.log(error);
            }
        });
       
    } catch (error) {
        console.log(error);
    }
}
