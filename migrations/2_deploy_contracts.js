const CovVrfy = artifacts.require("./CovVrfy.sol");

module.exports = function(deployer) {
  deployer.deploy(CovVrfy);
};
