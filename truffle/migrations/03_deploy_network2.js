const { writeEnv } = require('../utils/helper');

let LinkToken = artifacts.require('LinkToken');
let Oracle = artifacts.require('Oracle');

const GanacheChainlinkClient = artifacts.require("GanacheChainlinkClient");

module.exports = async (deployer, network, accounts) => {

	if(network === 'network2'){

	                  await deployer.deploy(LinkToken);
	  let linkToken = await LinkToken.deployed();

	  			      await deployer.deploy(Oracle, linkToken.address);
	  let oracle =    await Oracle.deployed();
	  	  
	  				  await deployer.deploy(GanacheChainlinkClient, linkToken.address);
	  let client =    await GanacheChainlinkClient.deployed();

	 //save address for chainlink node in certain network
	 await writeEnv(linkToken.address, oracle.address,client.address , network);

	}





};
