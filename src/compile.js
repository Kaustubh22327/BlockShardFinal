const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const newPath = path.resolve(__dirname, 'contracts', 'New.sol');
const source = fs.readFileSync(newPath, 'utf8');
 
const input = {
  language: 'Solidity',
  sources: {
    'New.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
 
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'New.sol'
].New;