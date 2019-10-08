export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}

export function fetchFurnitures() {
    const furnitures = require('data/items.json')
    return furnitures
export function exportRooms(rooms) {
    console.log('exportRooms', rooms);
}
