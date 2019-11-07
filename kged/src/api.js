import { exportJSON } from 'utils'
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
            delete f.selectedRoom
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

export function exportData(rooms, furnitures, items, interactions) {
    const dataObject = {rooms: rooms, furnitures: furnitures, items: items, interactions: interactions}
    // console.log('EXPORT ROOMS', dataObject)
    exportJSON(dataObject, 'rooms.json')
}
