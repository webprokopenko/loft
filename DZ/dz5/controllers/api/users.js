module.exports.saveUsers = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
    }
  }
