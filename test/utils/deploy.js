const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const solc = require('./solc');


module.exports.deployContract = async (contractName, network, initParams = [], optimize = false) => {
    var net = 'https://' + network +'.infura.io/';
    var web3 = new Web3(new HDWalletProvider(process.env.SEED, net));
    let contractPath = __dirname + "/../contracts/"+ contractName + ".sol";
    try{
        let {bytecode, abi } = await solc.compile(contractPath, contractName, optimize);
        let myContract = new web3.eth.Contract(abi);
        let result = await myContract.deploy({
            data: '0x' + bytecode,
            arguments: initParams
        })
        .send({
            from: process.env.ADDRESS,
        });
        return result.options.address;
    }catch(err){
        throw err;
    }
    
}