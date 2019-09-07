const jenga = artifacts.require("Jenga");

module.exports = function(deployer) {
  deployer.deploy(jenga);
};
