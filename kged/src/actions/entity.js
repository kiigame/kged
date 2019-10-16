export const setActiveEntity = (entity) => ({
    type: 'SET_ACTIVE_ENTITY',
    payload: {
        entity: entity
    }
})

export const updateActiveEntity = ({category, id}) => {
    return function(dispatch) {
        dispatch({
            type: 'UPDATE_ACTIVE_ENTITY',
            payload: {category: category, id: id}
        })
    }
}

