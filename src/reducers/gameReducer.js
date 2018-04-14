import { ethProvider, InfuraCryptoPhoenixes } from '../components/Constants'
import settings from '../phoenixes.json'
import {fetchGame} from '../actions/gameActions'

function getPhoenixes() {
    let PHOENIXES = []
    for (var i=0; i < 19; i++) {
        let phoenix = {
            id: i,
            name: settings[i].name,
            price: -1,
            payoutPercentage: 0,
            abilityAvailTime: 0,
            cooldown: 0,
            cooldownDecreaseAmt: 0,
            basePower: 0,
            currentPower: 0,
            powerIncreaseAmt: 0,
            powerDrop: 0,
            powerCap: 0,
            previousOwner: "0x",
            currentOwner: "0x"
          }
          PHOENIXES.push(phoenix)
    }
    return PHOENIXES
}

export default function reducer(state={
    gameInProgress: false,
    gameEnd: -1,
    gameFetched: false,
    phoenixesFetched: false,
    POOLS: ["-","-"],
    SCORES: ["-","-"],
    userFunds: -1,
    PHOENIXES: getPhoenixes()
  }, action) {
      switch (action.type) {
            case "WALLET_LOCKED": {
                return {
                    ...state,
                    userFunds: -1
                }
            }
            
            case "WALLET_ADDR_CHANGED": {
                let userFunds = InfuraCryptoPhoenixes.userFunds(action.payload)
                userFunds = ethProvider.fromWei(userFunds, 'ether').toNumber()
                return {
                    ...state,
                    userFunds: userFunds
                }
            }

            case "GAME_DURATION_UPDATED": {
                let now = new Date().getTime(),
                [GAME_STARTED,GAME_END] = action.payload
                return {
                    ...state,
                    gameInProgress: GAME_STARTED,
                    gameEnd: GAME_END
                }
            }

            case "RED_POOL_UPDATED": {
                return {
                      ...state,
                    POOLS: [action.payload,state.POOLS[1]]
                }
            }

            case "BLUE_POOL_UPDATED": {
                return {
                    ...state,
                    POOLS: [state.POOLS[0],action.payload]
                }
            }

            case "RED_SCORE_UPDATED": {
                return {
                    ...state,
                    SCORES: [action.payload,state.SCORES[1]]
                } 
            }

            case "BLUE_SCORE_UPDATED": {
                return {
                    ...state,
                    SCORES: [state.SCORES[0],action.payload]
                }
            }
            
            case "GAME_STATS_FETCHED": {
                return {
                    ...state,
                    gameFetched: true
                }
            }

            case "USER_FUNDS_UPDATED": {
                return {
                    ...state,
                    userFunds: action.payload
                }
            }

            case "PHOENIXES_FETCHING": {
                return {
                    ...state,
                    phoenixesFetched: false
                }
            }

            case "PHOENIXES_FETCHED": {
                return {
                    ...state,
                    phoenixesFetched: true
                }
            }

            case "PHOENIX_PUSHED": {
                let newPhoenix = {
                  id: action.id,
                  name: settings[action.id].name,
                  price: ethProvider.fromWei(action.payload[0],"ether").toNumber(),
                  payoutPercentage: action.payload[1].toNumber(),
                  abilityAvailTime: action.payload[2].toNumber(),
                  cooldown: action.payload[3].toNumber(),
                  cooldownDecreaseAmt: action.payload[4].toNumber(),
                  basePower: action.payload[5].toNumber(),
                  currentPower: action.payload[6].toNumber(),
                  powerIncreaseAmt: action.payload[7].toNumber(),
                  powerDrop: action.payload[8].toNumber(),
                  powerCap: action.payload[9].toNumber(),
                  previousOwner: action.payload[10],
                  currentOwner: action.payload[11]
                }
                
                return {
                    ...state,
                    PHOENIXES: state.PHOENIXES.map(
                      (phoenix,i) => i == newPhoenix.id ? newPhoenix : phoenix
                )
            }
        }
    }

      return state
  }