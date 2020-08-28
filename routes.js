const express = require('express');
const router = express.Router();
const environment = require('./config/index')
const db = require('./db/models/index.js')

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


router.get('/parks', asyncHandler(async (req, res, next) => {
    const parks = await db.Park.findAll({
        order: [['parkName', 'ASC']],
    })
    res.render('park-list', { title: 'Parks', parks});
}));


module.exports = router;