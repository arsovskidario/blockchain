const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const CryptoJS = require("crypto-js");

const { compileContract } = require('../contracts/compile');
const storageService = require('../services/storageService');

const { SSH_PRIVATE_KEY } = require('../constants/authConstants');

const provider = new HDWalletProvider(
    'jewel tower nature chat system vocal attract finish jealous among step school',
    'https://rinkeby.infura.io/v3/9e1ae1be96584586a2e2d3ed80cd75cf',
);

const web3 = new Web3(provider);

let contract;
let accounts;

const deployContract = async (districtName, voters, candidates) => {
    accounts = await web3.eth.getAccounts();
    const { abi, evm } = compileContract('ElectroralDistrict.sol');

    console.log('Attemting to deploy from account', accounts[0]);

    voters = voters.map(x => CryptoJS.HmacSHA256(x, SSH_PRIVATE_KEY).toString())

    contract = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [voters, candidates] })
        .send({ from: accounts[0], gas: '10000000' });

    console.log('Contract address: ', contract.options.address);
    //await storageService.insertDistrictAddress(districtName, contract.options.address);
    provider.engine.stop();
};

const subscribeToContract = async (address, fileName='ElectroralDistrict.sol') => {
    const { abi } = compileContract(fileName);
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(abi, address);
};

const getCurrentContract = () => {
    if(!contract) {
        throw Error('Contract not initialized!');
    }

    return contract;
};

const getAccount = () => {
    if(!accounts) {
        throw Error('Accounts not initialized!');
    }

    return accounts[0]; 
};

module.exports = {
    deployContract,
    subscribeToContract,
    getCurrentContract,
    getAccount,
}
