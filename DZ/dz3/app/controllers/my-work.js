const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db')();

module.exports.getIndex = function (req, res) {
    res.render('pages/my-work', { title: 'Мои работы', isAdmin: req.session.isAdmin , pic: db.stores.file.store});
}

module.exports.addWork = function (req, res, next) {
    let form = new formidable.IncomingForm();
    let upload = 'public/upload';
    let fileName;

    if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
    }
    
    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({msg:'Проект не загружен Ошибка!',status:'Error'});
        }

        if (files.file.name === '' || files.file.size === 0) {
            return res.json({msg:'Проект не загружен Ошибка!',status:'Error'});
        }

        if (!fields.projectName) {
            fs.unlink(files.file.path);
            return res.json({msg:'Проект не загружен Заполните все поля!',status:'Error'});
        }

        fileName = path.join(upload, files.file.name);
        fileNamedb = path.join('upload',files.file.name);

        fs.rename(files.file.path, fileName, function (err) {
            if (err) {
                console.error(err);
                fs.unlink(fileName);
                fs.rename(files.file.path, fileName); 
            }
            let dir = fileName.substr(fileName.indexOf('\\'));
            db.set(fields.projectName, {directory:fileNamedb,url:fields.projectUrl,description:fields.text});
            db.save();
            return res.json({msg:'Проект успешно загружен',status:'OK'})
        });
    })
}