import { combineReducers } from 'redux'
import entity from './entity'
import rooms from './rooms'
import furnitures from './furnitures'

const rootReducer = combineReducers({
    entity,
    rooms,
    furnitures
})

export default rootReducer
