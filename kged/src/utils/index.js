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
