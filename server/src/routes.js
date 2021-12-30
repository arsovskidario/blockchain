const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'It`s ok'});
});

router.use('/districts', require('./controllers/districtsController'));
router.use('/elections', require('./controllers/electionsController'))

module.exports = router; 
