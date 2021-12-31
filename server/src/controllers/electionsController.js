
const express = require('express');
const router = express.Router({ mergeParams: true });
const contractsService = require('../services/contractsService');

const vote = async (req, res) => {
    try {
        const { voter, candidate } = req.body;
        await contractsService.vote(voter, candidate);
        res.send({message: 'Yessss'});
    } catch (erorr){
        res.status(404).json({message: 'Wrong UCN or candidate!'});
    }
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await contractsService.getDistrictCandidates();

        res.send(candidates)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong!'});
    }
};

router.put('/vote', vote);
router.get('/candidates', getCandidates);

module.exports = router;
