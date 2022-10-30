const JobLib = artifacts.require("JobLib");
const JobPortal = artifacts.require("JobPortal");

module.exports = function(deployer) {
   
    deployer.deploy(JobLib)
    deployer.deploy(JobPortal,JobLib.address);
    
  };