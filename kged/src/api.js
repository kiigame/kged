export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}

export function exportRooms(rooms) {
    console.log('exportRooms', rooms);
}
