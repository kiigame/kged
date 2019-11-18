import { cloneDeep } from 'lodash/fp'

export function isExistingEntity(state, entityId) {
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

export function exportJSON(content, name) {
    const jsonContent = JSON.stringify(content, null, 4)
    const file = new Blob([jsonContent], {type: 'application/json'})
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(file)
    anchor.download = name
    anchor.click()
}

export function filterFurnitures(rooms) {
    let filteredRooms = cloneDeep(rooms)

    for (let room of filteredRooms) {
        if (room.children && room.children.some(c => c.attrs.category === 'furniture')) {
            room.children = room.children.filter(c => c.attrs.category !== 'furniture')
        }
    }

    return filteredRooms
}

export function extractFurnitures(rooms, interactions, texts) {
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
