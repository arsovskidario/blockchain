const { getDb } = require('../utils/dbUtils.js');

const insertDistrictAddress = (name, address) => {
    if ((name == null || name === '') || (address == null || address === '')) {
        return "Invalid parameteres for insert function!"
    }

    return getDb().run(`INSERT
                INTO DISTRICT_ADDRESS(NAME, ADDRESS)
                VALUES(?, ?);`, [name, address])
}

const getDistrictAddress = (name) => {
    if (name == null || name === '') {
        return "Invalid district name for get function!";
    }

    return getDb().get(`SELECT ADDRESS
                FROM DISTRICT_ADDRESS
                 WHERE NAME=?;`, [name])
}

const getDistricts = () => {
    return getDb().all(`SELECT NAME FROM "main"."DISTRICT_ADDRESS" LIMIT 0, 49999`, []);
}

module.exports = {
    getDistricts,
    getDistrictAddress,
    insertDistrictAddress,
}
