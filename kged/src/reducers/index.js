import { combineReducers } from 'redux'
import rooms from './rooms'
import furnitures from './furnitures'

const rootReducer = combineReducers({
    rooms,
    furnitures
})

export default rootReducer
