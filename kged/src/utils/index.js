export function isExistingEntity(state, entityId) {
    if (state.rooms && state.rooms.rooms && state.rooms.rooms.some(r => r.attrs && r.attrs.id === entityId)) {
        return true;
    }
    return false;
}
