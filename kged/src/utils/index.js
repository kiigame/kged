export function isExistingEntity(state, entityId) {
    // TODO: add other entity types
    if (state.rooms && state.rooms.rooms &&
        state.rooms.rooms.some(r => r.attrs && r.attrs.id === entityId)) {
        return true;
    }
    return false;
}

export function exportFile(content, name, type) {
    const file = new Blob([JSON.stringify(content, null, 4)], {type: type})
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(file)
    anchor.download = name
    anchor.click()
}
