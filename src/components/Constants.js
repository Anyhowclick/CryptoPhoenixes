var Web3 = require('web3')

//To change for mainnet
export const ethProvider = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/GuujZSIzbY0azOouyBPX"))
export const RIGHT_NETWORK_ID = "1" //1 = Main net, 3 = Ropsten, 4 = Rinkeby
export const CRYPTOPHOENIXES_CONTRACT_ADDR = "0x66e2c30609e9661f52e5d46e1f0f2e6955fda71e"
export const CONTRACT_LINK = "https://etherscan.io/address/" + CRYPTOPHOENIXES_CONTRACT_ADDR + "#code"
//CHANGE WRONG NETWORK NOTIFICATION MESSAGE IN NAVIGATIONBAR.JS

export const CryptoPhoenixesABI = require('../../build/contracts/CryptoPhoenixesCivilWar.json').abi
const CryptoPhoenixesContract = ethProvider.eth.contract(CryptoPhoenixesABI)
export var InfuraCryptoPhoenixes = CryptoPhoenixesContract.at(CRYPTOPHOENIXES_CONTRACT_ADDR)

export const HIGHER_PERCENTAGE_CUTOFF = 0.75
export const HIGHER_PRICE_RESET_PERCENTAGE = 20
export const LOWER_PRICE_RESET_PERCENTAGE = 10
export const BASE_PRICE = 0.0025
export const DENOMINATOR = 10000