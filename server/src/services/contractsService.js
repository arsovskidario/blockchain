const contractUtils = require('../utils/contractsUtils');
const CryptoJS = require("crypto-js");

const { SSH_PRIVATE_KEY } = require('../constants/authConstants');

const vote = async (voter, candidate) => {
    const account = await contractUtils.getAccount();
    voter = CryptoJS.HmacSHA256(voter, SSH_PRIVATE_KEY).toString();;
    await contractUtils.getCurrentContract()
        .methods.vote(voter, candidate).send({ from: account, gas: '1000000' });

};

const getDistrictWinner = async () => {
    const account = await contractUtils.getAccount();
    return await contractUtils.getCurrentContract()
        .methods.getDistrictWinner().call({ from: account });
};

const getDistrictCandidates = async () => {
    const account = await contractUtils.getAccount();
    return await contractUtils.getCurrentContract().methods.getDistrictCandidates().call({ from: account });
};

module.exports = {
    vote,
    getDistrictWinner,
    getDistrictCandidates,
}
