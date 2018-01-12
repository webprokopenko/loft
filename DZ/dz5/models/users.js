let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Укажите Имя'],
    unique: true
  },
  firstName:{
    type: String,
    unique: false,
    required:false,
  },
  middleName:{
    type: String,
    unique: false,
    required:false,
  },
  access_token:{
    type: String,
    unique: true,
    required:true,
  },
  img:{
    type: String,
    unique: false,
    required:false,
  },
  password: {
    type: String,
    required: [true, 'Укажите Пароль'],
    unique: false
  }
});

mongoose.model('users', usersSchema);
