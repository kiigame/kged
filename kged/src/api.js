import { cloneDeep } from 'lodash/fp'

export function fetchInteractions() {
    const interactions = require('data/interactions.json')
    return interactions
}

export function fetchTexts() {
    const texts = require('data/texts.json')
    return texts
}

export function exportRooms(state) {
    let rooms = cloneDeep(state.rooms.rooms)
    let furnitures = cloneDeep(state.furnitures.furnitures)

    rooms.forEach(room => {
        let roomFurnitures = furnitures.filter(f => f.selectedRoom && f.selectedRoom.attrs.id === room.attrs.id)
        // TODO: use schema for this
        for (let f of roomFurnitures) {
            if (f.attrs && f.attrs.url) {
                if (f.attrs.url.startsWith('blob:')) {
                    // is an objectURL
                    f.attrs.src = `images/${f.attrs.url.split('/').pop()}`
                } else {
                    // is a placeholder
                    f.attrs.src = f.attrs.url.replace('assets/', 'images/')
                }
                delete f.attrs.url
            }
            delete f.selectedRoom
            delete f.selectedDestination
            delete f.isDoor
            delete f.isExaminable
            delete f.examineText
        }
        if (room.children) {
            for (let c of room.children) {
                if (c.attrs && c.attrs.url && c.attrs.category === 'room_background') {
                    if (c.attrs.url.startsWith('blob:')) {
                        // is an objectURL
                        c.attrs.src = `images/${c.attrs.url.split('/').pop()}`
                    } else {
                        // is a placeholder
                        c.attrs.src = c.attrs.url.replace('assets/', 'images/')
                    }
                    delete c.attrs.url
                }
            }
        }
        if (roomFurnitures && roomFurnitures.length) {
            if (!room.children) {
                room.children = []
            }
            room.children = [...room.children, ...roomFurnitures]
        }
    })

    return rooms
}

export function exportItems(state) {
    let items = cloneDeep(state.items.items)

    items.forEach(item => {
        if (item.attrs && item.attrs.url) {
            if (item.attrs.url.startsWith('blob:')) {
                // is an objectURL
                item.attrs.src = `images/${item.attrs.url.split('/').pop()}`
            } else {
                // is a placeholder
                item.attrs.src = item.attrs.url.replace('assets/', 'images/')
            }
            delete item.attrs.url
        }
    })

    return items
}

export function exportInteractions(state) {
    let interactions = cloneDeep(state.interactions.interactions)
    return interactions
}

export function exportTexts(state) {
    let texts = cloneDeep(state.texts.texts)
    return texts
}
