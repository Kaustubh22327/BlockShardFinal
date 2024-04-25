const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');
 
const provider = new HDWalletProvider(
    'future museum expect fruit damp example salad furnace genuine afford error promote',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/dccc348e8c7a4a0089762e8a3323a996'
    // remember to change this to your own endpoint!
  );
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();