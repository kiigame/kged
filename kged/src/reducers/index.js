import entity from './entity'
import rooms from './rooms'
import furnitures from './furnitures'
import items from './items'
import texts from './texts'
import interactions from './interactions'
import preview from './preview'
import global from './global'

const rootReducer = (state = {}, actions) => ({
    entity: entity(state.entity, actions),
    rooms: rooms(state.rooms, actions),
    furnitures: furnitures(state.furnitures, actions),
    items: items(state.items, actions),
    interactions: interactions(state.interactions, actions),
    texts: texts(state.texts, actions),
    preview: preview(state.preview, actions, state),
    global: global(state.global, actions)
})

export default rootReducer
