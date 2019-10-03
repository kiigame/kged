export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}
