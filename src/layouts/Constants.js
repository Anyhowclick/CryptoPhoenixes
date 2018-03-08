export const MAX_COOLDOWN = 7
export const MAX_POWER = 15
export const POWER_DENOMINATOR = 10 
export const DIVIDEND_DENOMINATOR = 10

var Web3 = require('web3')
const ethProvider = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"))
export const RIGHT_NETWORK_ID = "3" //1 = Main net, 3 = Ropsten
export const CRYPTOPHOENIXES_CONTRACT_ADDR = "0x707fd610c05e5a14a7a65545252536e9ef89bc67"
export const CONTRACT_LINK = "https://ropsten.etherscan.io/address/" + CRYPTOPHOENIXES_CONTRACT_ADDR
export const CryptoPhoenixesABI = require('../../build/contracts/CryptoPhoenixes.json').abi
const CryptoPhoenixesContract = ethProvider.eth.contract(CryptoPhoenixesABI)
export var InfuraCryptoPhoenixes = CryptoPhoenixesContract.at(CRYPTOPHOENIXES_CONTRACT_ADDR)

export const HIGHER_PERCENTAGE_CUTOFF = 1
export const HIGHER_PRICE_RESET_PERCENTAGE = 20
export const LOWER_PRICE_RESET_PERCENTAGE = 10
export const BASE_PRICE = 0.0025