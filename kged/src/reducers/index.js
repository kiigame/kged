import entity from './entity'
import rooms from './rooms'
import furnitures from './furnitures'
import items from './items'
import interactions from './interactions'

const rootReducer = (state = {}, actions) => ({
    entity: entity(state.entity, actions, state),
    rooms: rooms(state.rooms, actions),
    furnitures: furnitures(state.furnitures, actions),
    items: items(state.items, actions),
    interactions: interactions(state.interactions, actions)
})

export default rootReducer
