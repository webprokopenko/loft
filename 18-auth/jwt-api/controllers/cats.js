const mongoose = require('mongoose');

module.exports.getCats = function(req, res) {
  const Cats = mongoose.model('cat');
  Cats.find()
    .then(items => {
      res.json(items);
    })
    .catch(e => {
      res.status(400).json({ err: e.message });
    });
};

module.exports.getCat = function(req, res) {
  let id = req.params.id;

  const Cats = mongoose.model('cat');
  Cats.findById(id)
    .then(item => {
      if (!!item) {
        res.json(item);
      } else {
        res.status(404).json({ err: 'Cat not found' });
      }
    })
    .catch(e => {
      res.status(400).json({ err: e.message });
    });
};

module.exports.addCat = function(req, res) {
  if (!!!req.body.name || !!!req.body.age) {
    return res.status(400).json({ err: 'Data format is not correct' });
  }

  const Cats = mongoose.model('cat');
  let Cat = new Cats({
    name: req.body.name,
    age: parseInt(req.body.age)
  });

  Cat.save()
    .then(item => {
      res.json(item);
    })
    .catch(e => {
      res.status(400).json({ err: e.message });
    });
};

module.exports.editCat = function(req, res) {
  if (!(!!req.body.name) || !(!!req.body.age)) {
    return res.status(400).json({ err: 'Data format is not correct' });
  }

  let id = req.params.id;
  let data = {
    name: req.body.name,
    age: parseInt(req.body.age)
  };
  const Cats = mongoose.model('cat');
  Cats.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  )
    .then(item => {
      if (!!item) {
        res.json(item);
      } else {
        res.status(404).json({ err: 'Cat not found' });
      }
    })
    .catch(e => {
      res.status(400).json({ err: e.message });
    });
};

module.exports.deleteCat = function(req, res) {
  let id = req.params.id;
  const Cats = mongoose.model('cat');
  Cats.findByIdAndRemove(id)
    .then(item => {
      if (!!item) {
        res.json(item);
      } else {
        res.status(404).json({ err: 'Cat not found' });
      }
    })
    .catch(e => {
      res.status(400).json({ err: e.message });
    });
};
