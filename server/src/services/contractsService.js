const contractUtils = require('../utils/contractsUtils');
const CryptoJS = require("crypto-js");

const { CANDIDATES } = require('../constants/contractConstants');
const { SSH_PRIVATE_KEY } = require('../constants/authConstants');

const vote = async (districtAddress, voter, candidate) => {
    const account = await contractUtils.getAccount();
    voter = CryptoJS.HmacSHA256(voter, SSH_PRIVATE_KEY).toString();
    const contract =  await contractUtils.subscribeToContract(districtAddress);
    await contract.methods.vote(voter, candidate).send({ from: account, gas: '1000000' });
};

const getDistrictWinner = async (districtAddress, candidate) => {
    const account = await contractUtils.getAccount();
    const contract =  await contractUtils.subscribeToContract(districtAddress);
    return contract.methods.getDistrictWinner(candidate).call({ from: account });
};

const getDistrictCandidates = async (districtAddress) => {
    const account = await contractUtils.getAccount();
    const contract =  await contractUtils.subscribeToContract(districtAddress);
    return contract.methods.getDistrictCandidates().call({ from: account });
};

const deployContract = async (districtName, voters) => {
    await contractUtils.deployContract(districtName, voters, CANDIDATES);
};


module.exports = {
    vote,
    getDistrictWinner,
    getDistrictCandidates,
    deployContract,
}
