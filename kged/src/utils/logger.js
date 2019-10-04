const logger = store => next => action => {
    console.group(action.type)
    console.log('dispatch', action)
    let result = next(action)
    console.log('new state:', store.getState())
    console.groupEnd()

    return result
}

export default logger
