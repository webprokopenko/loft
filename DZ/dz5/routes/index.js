const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlUsers = require('../controllers/api/users');

router.get('*', ctrlHome.getIndex);
router.post('/api/saveNewUser', ctrlUsers.saveUsers);


module.exports = router;