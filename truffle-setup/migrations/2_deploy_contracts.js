const NotesStorage = artifacts.require("NotesStorage");

module.exports = function (deployer) {
  deployer.deploy(NotesStorage);
};
