const express = require('express');
const districtsData = require('../services/storageService');
const contractsService = require('../services/contractsService');
const router = express.Router({ mergeParams: true });

const getDistricts = async (req, res) => {
    try {
        const districts = await districtsData.getDistricts();
        res.send(districts);
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong!' });
    }
};

const getDistrictWinner = async (req, res) => {
    try {
        const { district } = req.params;
        //const winner = await contractsService.getDistrictWinner();
        const districtAddress = await districtsData.getDistrictAddress(district);
        const candidates = await contractsService.getDistrictCandidates(districtAddress.ADDRESS);

        let candidatesResults = [];

        for (let index = 0; index < candidates.length; index++) {
            const candidateResult = await contractsService.getDistrictWinner(districtAddress.ADDRESS, candidates[index]);
            candidatesResults.push({name: candidates[index], count: Number(candidateResult)});
        }

        candidatesResults = candidatesResults.sort((a, b) => {
            return a.count - b.count;
        })

        res.send(candidatesResults);
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong!' });
    }
};

const getDistrictCandidates = async (req, res) => {
    try {
        const { district } = req.params;
        const districtAddress = await districtsData.getDistrictAddress(district);
        const candidates = await contractsService.getDistrictCandidates(districtAddress.ADDRESS);

        res.send(candidates);
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong!' });
    }
};

const deployDistrict = async (req, res) => {
    try {
        const { voters, region } = req.body;

        await contractsService.deployContract(region, voters);

        res.send({ message: 'Yessss' });
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong!' });
    }
};

router.get('/', getDistricts);
router.get('/:district/winner', getDistrictWinner);
router.get('/:district/candidates', getDistrictCandidates);
router.post('/', deployDistrict);

module.exports = router;
