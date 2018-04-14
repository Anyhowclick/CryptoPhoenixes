import { CryptoPhoenixesABI, CRYPTOPHOENIXES_CONTRACT_ADDR } from '../components/Constants'

export default function reducer(state={
    contract: '',
  }, action) {
      switch (action.type) {
          case "WEB3_INJECTED": {
              let web3 = action.payload,
              CryptoPhoenixesContract = web3.eth.contract(CryptoPhoenixesABI),
              contract = CryptoPhoenixesContract.at(CRYPTOPHOENIXES_CONTRACT_ADDR)
              return {
                  ...state,
                  contract: contract
              }
          }
      }
      return state
  }