

const Oracle = artifacts.require('Oracle');
let env_net1 = require('dotenv').config({ path: '../build/addrs_network1.env' })
let env_net2 = require('dotenv').config({ path: '../build/addrs_network2.env' })

module.exports = async callback => {

  let adr = process.argv[5] === 'network1' ? env_net1.parsed.ORACLE_CONTRACT_ADDRESS : process.argv[5] === 'network2' ? env_net2.parsed.ORACLE_CONTRACT_ADDRESS : '0x0';

  const getAddr = require('../../'+process.argv[5]+'/chainlink/get-addr');

  console.log(`========================== TRANSFER ETH TO CHAINLINK NODE ON  ${adr} ==========================`);

  const oracle = await Oracle.at(adr);
  const accountAddr = await getAddr();
  console.log(`Setting fulfill permission to true for ${accountAddr}...`);
  const tx = await oracle.setFulfillmentPermission(accountAddr, true);
  console.log(`Fulfillment succeeded! Transaction ID: ${tx.tx}.`);

  const accounts = await web3.eth.getAccounts();
  console.log(`Sending 1 ETH from ${accounts[0]} to ${accountAddr}.`);
  const result = await web3.eth.sendTransaction({from: accounts[0], to: accountAddr, value: '100000000000000000000'});
  console.log(`Transfer succeeded! Transaction ID: ${result.transactionHash}.`);

  callback();
}
