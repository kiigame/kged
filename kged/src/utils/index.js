import { cloneDeep } from 'lodash/fp'

export function isExistingEntity(state, entityId) {
    // checks if an entity with the given ID exists in the global state
    // TODO: add other entity types
    if (state.rooms && state.rooms.rooms &&
        state.rooms.rooms.some(r => r.attrs && r.attrs.id === entityId)) {
        return true;
    }
    if (state.furnitures && state.furnitures.furnitures &&
        state.furnitures.furnitures.some(r => r.attrs && r.attrs.id === entityId)) {
        return true;
    }
    if (state.items && state.items.items &&
        state.items.items.some(r => r.attrs && r.attrs.id === entityId)) {
        return true;
    }
    return false;
}

export function extractRooms(rooms) {
    // remove furniture objects from room data
    let filteredRooms = cloneDeep(rooms)

    for (let room of filteredRooms) {
        if (room.children && room.children.some(c => c.attrs.category === 'furniture')) {
            room.children = room.children.filter(c => c.attrs.category !== 'furniture')
        }
    }

    return filteredRooms
}

export function extractFurnitures(rooms, interactions, texts) {
    // extract furniture objects from room data
    const furnitures = rooms.flatMap(room => {
        if (room.attrs && room.children) {
            let furnitureChildren = room.children.filter(c => c.attrs && c.attrs.category === 'furniture')
            return furnitureChildren.map(c => {
                let data = {
                    ...c,
                    selectedRoom: {
                        attrs: { id: room.attrs.id }
                    }
                }
                let ti = getTransitionInteraction(c.attrs.id, interactions)
                if (ti) {
                    data = {
                        ...data,
                        isDoor: true,
                        selectedDestination: {
                            attrs: { id: ti.click[0].destination }
                        }
                    }
                }
                let ei = getExamineInteraction(c.attrs.id, interactions)
                if (ei) {
                    data = {
                        ...data,
                        isExaminable: true,
                        examineText: texts[c.attrs.id]['examine']
                    }
                }
                return data
            })
        }
    }).filter(f => f)
    return furnitures
}

function getTransitionInteraction(furniture, interactions) {
    // get the do_transition interaction for a furniture if it exists

    let match = Object.keys(interactions).find(i => i === furniture)

    if (!match || !interactions[match].click) {
        return
    }
    let interaction = interactions[match]
    for (let c of interaction.click) {
        if (c.command === 'do_transition') {
            return interaction
        }
    }
}

function getExamineInteraction(furniture, interactions) {
    // get the examine interaction for a furniture if it exists

    let match = Object.keys(interactions).find(i => i === furniture)
    if (!match || !interactions[match].click) {
        return
    }

    let interaction = interactions[match]
    for (let c of interaction.click) {
        if (c.command === 'monologue' && c.textkey.string === 'examine') {
            return interaction
        }
    }
}

export function extractImagesFromRooms(rooms) {
    // return a list of image objects from room data

    let images = []
    rooms.forEach(room => {
        room.children.forEach(c => {
            if (c && c.attrs && c.attrs.url && c.attrs.url !== 'assets/placeholders/room.png') {
                // room child has a non-placeholder objectURL, extract it
                images.push({name: c.attrs.url.split('/').pop(), file: fetch(c.attrs.url).then(r => r.blob())})
            }
        })
    })
    return images
}

export function extractImagesFromFurnitures(furnitures) {
    // return a list of image objects from furniture data

    let images = []
    furnitures.flatMap(furniture => {
        if (furniture && furniture.attrs && furniture.attrs.url && furniture.attrs.url !== 'assets/placeholders/furniture.png') {
            // furniture has a non-placeholder objectURL, extract it
            images.push({name: furniture.attrs.url.split('/').pop(), file: fetch(furniture.attrs.url).then(r => r.blob())})
        }
    })
    return images
}

export function extractImagesFromItems(items) {
    // return a list of image objects from item data

    let images = []
    items.flatMap(item => {
        if (item && item.attrs && item.attrs.url && item.attrs.url !== 'assets/placeholders/item.png') {
            // item has a non-placeholder objectURL, extract it
            images.push({name: item.attrs.url.split('/').pop(), file: fetch(item.attrs.url).then(r => r.blob())})
        }
    })
    return images
}

export function mapAssetsToRooms(roomData, imageData) {
    // add objectURL attribute to room children with an image (src attribute)

    const rooms = cloneDeep(roomData)
    rooms.forEach(room => {
        if (room.children) {
            room.children.forEach(c => {
                if (c && c.attrs && c.attrs.src) {
                    if (imageData[c.attrs.src]) {
                        c.attrs.url = imageData[c.attrs.src]
                    }
                }
            })
        }
    })

    return rooms
}

export function mapAssetsToFurnitures(furnitureData, imageData) {
    // add objectURL attribute to furnitures with an image (src attribute)

    const furnitures = cloneDeep(furnitureData)
    furnitures.forEach(furniture => {
        if (furniture && furniture.attrs && furniture.attrs.src) {
            if (imageData[furniture.attrs.src]) {
                furniture.attrs.url = imageData[furniture.attrs.src]
            }
        }
    })

    return furnitures
}

export function mapAssetsToItems(itemData, imageData) {
    // add objectURL attribute to items with an image (src attribute)

    const items = cloneDeep(itemData)
    items.forEach(item => {
        if (item && item.attrs && item.attrs.src) {
            if (imageData[item.attrs.src]) {
                item.attrs.url = imageData[item.attrs.src]
            }
        }
    })

    return items
}
