var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://root:567234@ds121965.mlab.com:21965/it651';

module.exports.getCats = function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) {
      return res.status(400).json({ err: err.message });
    }
    db
      .collection('cats')
      .find()
      .toArray(function(err, results) {
        if (err) {
          return res.status(400).json({ err: err.message });
        }
        db.close();
        res.json(results);
      });
  });
};

module.exports.getCat = function(req, res) {
  try {
    var id = new ObjectID(req.params.id);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }

  mongoClient.connect(url, function(err, db) {
    db
      .collection('cats')
      .find({ _id: id })
      .toArray(function(err, Cat) {
        if (err) {
          return res.status(400).json({ err: err.message });
        }
        db.close();
        if (Cat.length > 0) {
          res.json(Cat[0]);
        } else {
          res.status(404).json({ err: 'Cat not found' });
        }
      });
  });
};

module.exports.addCat = function(req, res) {
  if (!!!req.body.name || !!!req.body.age) {
    return res.status(400).json({ err: 'Data format is not correct' });
  }

  let Cat = {
    name: req.body.name,
    age: parseInt(req.body.age)
  };

  mongoClient.connect(url, function(err, db) {
    db.collection('cats').insertOne(Cat, function(err, result) {
      db.close();
      console.log(result);
      res.json(result.ops[0]);
    });
  });
};

module.exports.editCat = function(req, res) {
  if (!!!req.body.name || !!!req.body.age) {
    return res.status(400).json({ err: 'Data format is not correct' });
  }

  try {
    var id = new ObjectID(req.params.id);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }

  mongoClient.connect(url, function(err, db) {
    if (err) {
      return res.status(400).json({ err: err.message });
    }
    let updateCat = {
      name: req.body.name,
      age: parseInt(req.body.age)
    };

    db.collection('cats').findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: updateCat
      },
      {
        returnOriginal: false
      },
      function(err, result) {
        if (err) {
          return res.status(404).json({ err: 'Cat not found' });
        }
        db.close();
        res.json(result.value);
      }
    );
  });
};

module.exports.deleteCat = function(req, res) {
  try {
    var id = new ObjectID(req.params.id);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }

  mongoClient.connect(url, function(err, db) {
    if (err) {
      return res.status(400).json({ err: err.message });
    }
    db.collection('cats').deleteOne(
      {
        _id: id
      },
      function(err, result) {
        if (err) {
          return res.status(400).json({ err: err.message });
        }
        db.close();
        res.json({result: result.result.n});
      }
    );
  });
};
