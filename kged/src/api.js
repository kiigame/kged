import { exportJSON } from 'utils'

export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}

export function fetchFurnitures() {
    const rooms = fetchRooms()

    const furnitures = rooms.flatMap(room => {
        if (room.attrs && room.children) {
            console.log(room)
            return room.children.filter(c => c.attrs && c.attrs.category === 'furniture')
        }
    }).filter(f => f)

    return furnitures
}

export function exportRooms(rooms) {
    const roomObject = {rooms: rooms}
    console.log('EXPORT ROOMS', roomObject)
    exportJSON(roomObject, 'rooms.json')
}
