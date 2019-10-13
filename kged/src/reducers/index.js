import entity from './entity'
import rooms from './rooms'
import furnitures from './furnitures'

const rootReducer = (state = {}, actions) => ({
    entity: entity(state.entity, actions, state),
    rooms: rooms(state.rooms, actions),
    furnitures: furnitures(state.furniture, actions)
})

export default rootReducer
