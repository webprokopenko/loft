require('../../models/news');
const mongoose = require('mongoose');
const News = mongoose.model('news');

module.exports.saveNews = function (req, res) {
    if (!(!!req.body.userId) || !(!!req.body.date) || !(!!req.body.text) || !(!!req.body.theme)) {
        return res.status(400).json({ err: 'Data format is not correct' });
    }
    try {
        const newNews = new News({
            userId: req.body.userId,
            date: req.body.date,
            text: req.body.text,
            theme: req.body.theme,
        });
        try {
            newNews.save();
            return res.json(newNews);
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
}