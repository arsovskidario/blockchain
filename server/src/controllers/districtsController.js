const express = require('express');
const districtsData = require('../services/storageService');
const router = express.Router({ mergeParams: true });

const getDistricts = async (req, res) => {
    try {
        const districts = [{ address: '000458566', name: 'Vidin' }, { address: '552646', name: 'Pleven' }, { address: '85631351', name: 'Inovo' }];
        console.log(await districtsData.getDistricts())
        res.send(districts);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: 'Something went wrong!' });
    }
};

router.get('/', getDistricts);

module.exports = router;
