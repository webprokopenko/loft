let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let catSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Укажите имя кота'],
    unique: true
  },
  age: {
    type: Number
  }
});

mongoose.model('cat', catSchema);
