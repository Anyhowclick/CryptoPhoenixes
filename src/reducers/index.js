import {combineReducers} from "redux"
import { routerReducer } from 'react-router-redux'
import web3Status from "./web3StatusReducer"
import contract from "./contractReducer"
import game from "./gameReducer"

export default combineReducers({
  routing: routerReducer,
  web3Status,
  contract,
  game
})