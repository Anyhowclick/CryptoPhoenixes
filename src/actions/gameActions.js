import { ethProvider, InfuraCryptoPhoenixes } from '../components/Constants'
import settings from '../phoenixes.json'

export function fetchGame() {
  return async function(dispatch) {
    let GAME_STARTED = InfuraCryptoPhoenixes.GAME_STARTED(),
    GAME_END = InfuraCryptoPhoenixes.GAME_END().toNumber(),
    RED_POOL = ethProvider.fromWei(InfuraCryptoPhoenixes.POOLS(0),'ether').toNumber().toFixed(5),
    BLUE_POOL = ethProvider.fromWei(InfuraCryptoPhoenixes.POOLS(1),'ether').toNumber().toFixed(5),
    RED_SCORE = (ethProvider.fromWei(InfuraCryptoPhoenixes.SCORES(0),'finney').toNumber()*100).toFixed(),
    BLUE_SCORE = (ethProvider.fromWei(InfuraCryptoPhoenixes.SCORES(1),'finney').toNumber()*100).toFixed()

    dispatch({type: "GAME_DURATION_UPDATED", payload: [GAME_STARTED,GAME_END]})
    dispatch({type: "RED_POOL_UPDATED", payload: RED_POOL})
    dispatch({type: "BLUE_POOL_UPDATED", payload: BLUE_POOL})
    dispatch({type: "RED_SCORE_UPDATED", payload: RED_SCORE})
    dispatch({type: "BLUE_SCORE_UPDATED", payload: BLUE_SCORE})
    dispatch({type: "GAME_STATS_FETCHED"}) 
  }
}

export function getGameDuration() {
  return async function(dispatch) {
    let GAME_STARTED = InfuraCryptoPhoenixes.GAME_STARTED(),
    GAME_END = InfuraCryptoPhoenixes.GAME_END().toNumber()
    dispatch({type: "GAME_DURATION_UPDATED", payload: [GAME_STARTED,GAME_END]})
  }
}

export function updatePools(contract) {
  return async function(dispatch) {
    function procRedPool(err,res) {
      if(!err) {
        updateRedPool(ethProvider.fromWei(res,'ether').toNumber().toFixed(6))
      } else {
        console.log(err)
      }
    }

    function procBluePool(err,res) {
      if(!err) {
        updateBluePool(ethProvider.fromWei(res,'ether').toNumber().toFixed(6))
      } else {
        console.log(err)
      }
    }

    var updateRedPool = function(res) {
      dispatch({type: "RED_POOL_UPDATED", payload: res})
    }

    var updateBluePool = function(res) {
      dispatch({type: "BLUE_POOL_UPDATED",payload: res})
    }

    await contract.POOLS(0,procRedPool)
    await contract.POOLS(1,procBluePool)
  }
}

export function updateScores(contract) {
  return async function(dispatch) {
    function procRedScore(err,res) {
      if(!err) {
        updateRedScore(ethProvider.fromWei(res,'finney').toNumber().toFixed(1)*100)
      } else {
        console.log(err)
      }
    }

    function procBlueScore(err,res) {
      if(!err) {
        updateBlueScore(ethProvider.fromWei(res,'finney').toNumber().toFixed(1)*100)
      } else {
        console.log(err)
      }
    }

    var updateRedScore = function(res) {
      dispatch({type: "RED_SCORE_UPDATED", payload: res})
    }

    var updateBlueScore = function(res) {
      dispatch({type: "BLUE_SCORE_UPDATED",payload: res})
    }

    await contract.SCORES(0,procRedScore)
    await contract.SCORES(1,procBlueScore)
  }
}

export function updateUserFunds(contract,currAccount) {
  return async function(dispatch) {
    function procUserFunds(err,res) {
      if(!err) {
        updateFund(res)
      } else {
        console.log(err)
      }
    }

    var updateFund = function(res) {
      dispatch({type: "USER_FUNDS_UPDATED", payload: ethProvider.fromWei(res,'ether').toNumber()})
    }

    if (currAccount) {
      await contract.userFunds(currAccount,procUserFunds)
    }
  }
}

export function fetchPhoenix(contract, id) {
  return async function(dispatch) {
    function procPhoenix(err,res) {
      if(!err) {
        pushPhoenix(res)
      } else {
        console.log(err)
      }
    }

    var pushPhoenix = function(res) {
      dispatch({type: "PHOENIX_PUSHED",id: id, payload:res})
    }

    await contract.PHOENIXES(id, procPhoenix)
  }
}