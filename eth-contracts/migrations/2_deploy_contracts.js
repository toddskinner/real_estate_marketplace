// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SquareVerifier);
  const squareVerifier = await SquareVerifier.deployed();

  await deployer.deploy(SolnSquareVerifier, squareVerifier.address);
};
