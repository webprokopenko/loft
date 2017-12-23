const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index.js');
const ctrlMyWork = require('../controllers/my-work');
const ctrlContant = require('../controllers/contact-me');
const ctrlLogin = require('../controllers/login');

router.get('/', ctrlHome.getIndex);
router.post('/', ctrlHome.sendData);

router.get('/my-work',ctrlMyWork.getIndex);
router.post('/my-work',ctrlMyWork.addWork);

router.get('/contact-me', ctrlContant.getIndex);
router.post('/contact-me',ctrlContant.sendEmail);

router.get('/login', ctrlLogin.getIndex);
router.post('/login',ctrlLogin.postLogin); 

module.exports = router;