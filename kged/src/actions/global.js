import * as api from 'api'

export const exportProject = (event) => {
    return (dispatch, getState) => {
        const state = getState()
        const rooms = api.exportRooms(state)
        const items = api.exportItems(state)

        console.log('EXPORT ROOMS:', rooms)
        console.log('EXPORT ITEMS:', items)

        // TODO: build zip from json files and assets
        // exportJSON(dataObject, 'rooms.json')
    }
}
