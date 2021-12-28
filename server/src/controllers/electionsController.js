
const express = require('express');
const router = express.Router({ mergeParams: true });

const vote = async (req, res) => {
    try {
        res.send({ asd: 45})
    } catch {
        res.status(404).json({message: 'Something went wrong!'});
    }
};

router.get('/vote', vote);

module.exports = router;
