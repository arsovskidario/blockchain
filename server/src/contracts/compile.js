const fs = require('fs');
const path = require('path');
const solc = require('solc');

const compileContract = (fileName) => {
    const inboxPath = path.resolve(__dirname, fileName);
    const source = fs.readFileSync(inboxPath, 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            'ElectoralDistrict': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    return JSON.parse(solc.compile(JSON.stringify(input))).contracts.ElectoralDistrict.ElectoralDistrict;
}

module.exports = {
    compileContract,
}
