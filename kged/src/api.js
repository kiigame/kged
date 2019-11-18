import { cloneDeep } from 'lodash/fp'

export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}

export function fetchFurnitures() {
    const rooms = fetchRooms()

    const furnitures = rooms.flatMap(room => {
        if (room.attrs && room.children) {
            return room.children
                .filter(c => c.attrs && c.attrs.category === 'furniture')
                .map(c => {
                    return {
                        ...c,
                        selectedRoom: {
                            attrs: { id: room.attrs.id }
                        }
                    }
                })
        }
    }).filter(f => f)

    return furnitures
}

export function fetchItems() {
    const items = require('data/items.json')
    return items
}

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
                f.attrs.src = f.attrs.url.replace('assets/', 'images/')
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
                    c.attrs.src = c.attrs.url.replace('assets/', 'images/')
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
            item.attrs.src = item.attrs.url.replace('assets/', 'images/')
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
