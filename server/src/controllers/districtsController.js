const express = require('express');
const storage = require('../services/storageService');
const router = express.Router({ mergeParams: true });

const getDistricts = async (req, res) => {

    //TODO: Should be global for entire project and shutdown() when project is shutdown 
    //TODO: GET /name?arg=Kumanovo
    //TODO: POST {name, address}
    const storageService = new StorageService();
    try {
        res.send(storageService.getDistricts());
    } catch {
        res.status(404).json({message: 'Something went wrong!'});
    }
};

router.get('/', getDistricts);

module.exports = router;
