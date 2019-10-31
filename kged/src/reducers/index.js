import entity from './entity'
import rooms from './rooms'
import furnitures from './furnitures'
import items from './items'

const rootReducer = (state = {}, actions) => ({
    entity: entity(state.entity, actions, state),
    rooms: rooms(state.rooms, actions),
    furnitures: furnitures(state.furnitures, actions),
    items: items(state.items, actions),
})

export default rootReducer
