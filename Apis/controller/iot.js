const Web3 = require('web3');
const PrivateKeyProvider = require("truffle-privatekey-provider");
const privateKey = "a91914d7a7a0836595c1a233bc2ec7c3835528d62bbea1c8b41df2bebffd3860";
const provider =  new PrivateKeyProvider(privateKey, 'https://ropsten.infura.io/v3/d2daa1d1766c426f8e51b820dc980be9');
const contractAddress = "0x55d28E726B479C462ed3485c9e701fc4f098EB5B";
const abiArray = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"infoByIndex","outputs":[{"name":"geo","type":"string"},{"name":"timestamps","type":"uint256"},{"name":"behavior","type":"bool"},{"name":"events","type":"string"},{"name":"user","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"},{"name":"_geo","type":"string"},{"name":"_behavior","type":"bool"}],"name":"addInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"},{"indexed":false,"name":"_geo","type":"string"},{"indexed":false,"name":"_timestamps","type":"uint256"},{"indexed":false,"name":"_behavior","type":"bool"},{"indexed":false,"name":"_events","type":"string"}],"name":"infoAdded","type":"event"}];
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(abiArray, contractAddress);
  
async function read(req, res) {
  let index = parseInt(req.query.index);
  await contract.methods.infoByIndex(index).call().then(function (result) {
  	console.log(result);
    res.send({success: true, data: result});
    return;
  }).catch(function (error) {
  	console.log(error);
    res.send({success: false, data: error.message});
    return;
  })
}

async function save(req, res) {
  const accounts = await web3.eth.getAccounts();
  let _index = parseInt(req.body._index);
  let _geo = req.body._geo;
  let _behavior = req.body._behavior;
  await contract.methods.addInfo(_index, _geo, _behavior).send({ from: accounts[0], gasLimit: 250000, gasPrice: 30000000000}, (error, result) => {
    if(error) {
      console.log(error);
      res.send({success: false, data: error.message});
      return;
    }
    console.log(result);
    res.send({success: true, data: result});
    return;
  })
}

module.exports = {
    read,
    save
}