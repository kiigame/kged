import { cloneDeep } from 'lodash/fp'

export function exportRooms(state, preview=false) {
    // export state room data as engine-compatible (removes/converts editor-specific data)
    // if the preview argument is true, assigns image src attributes directly to object urls
    // if the preview argument is false, assigns image src attributes to file paths in the zip

    let rooms = cloneDeep(state.rooms.rooms)
    let furnitures = cloneDeep(state.furnitures.furnitures)

    rooms.forEach(room => {
        let roomFurnitures = furnitures.filter(f => f.selectedRoom && f.selectedRoom.attrs.id === room.attrs.id)
        // TODO: use schema for this
        for (let f of roomFurnitures) {
            if (f.attrs && f.attrs.url) {
                if (f.attrs.url.startsWith('blob:')) {
                    // is an objectURL
                    if (preview) {
                        f.attrs.src = f.attrs.url
                    } else {
                        f.attrs.src = `images/${f.attrs.url.split('/').pop()}`
                    }
                } else {
                    // is a placeholder
                    if (preview) {
                        f.attrs.src = f.attrs.url
                    } else {
                        f.attrs.src = f.attrs.url.replace('assets/', 'images/')
                    }
                }
                delete f.attrs.url
            }
            // remove editor-specific data
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
                        if (preview) {
                            c.attrs.src = c.attrs.url
                        } else {
                            c.attrs.src = `images/${c.attrs.url.split('/').pop()}`
                        }
                    } else {
                        // is a placeholder
                        if (preview) {
                            c.attrs.src = c.attrs.url
                        } else {
                            c.attrs.src = c.attrs.url.replace('assets/', 'images/')
                        }
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

export function exportItems(state, preview=false) {
    // export state item data as engine-compatible (removes/converts editor-specific data)
    // if the preview argument is true, assigns image src attributes directly to object urls
    // if the preview argument is false, assigns image src attributes to file paths in the zip

    let items = cloneDeep(state.items.items)

    items.forEach(item => {
        if (item.attrs && item.attrs.url) {
            if (item.attrs.url.startsWith('blob:')) {
                // is an objectURL
                if (preview) {
                    item.attrs.src = item.attrs.url
                } else {
                    item.attrs.src = `images/${item.attrs.url.split('/').pop()}`
                }
            } else {
                // is a placeholder
                if (preview) {
                    item.attrs.src = item.attrs.url
                } else {
                    item.attrs.src = item.attrs.url.replace('assets/', 'images/')
                }
            }
            delete item.attrs.url
        }
    })

    return items
}

export function exportInteractions(state) {
    // export state interaction data
    let interactions = cloneDeep(state.interactions.interactions)
    return interactions
}

export function exportTexts(state) {
    // export state texts data
    let texts = cloneDeep(state.texts.texts)
    return texts
}
