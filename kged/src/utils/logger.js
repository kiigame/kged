const logger = store => next => action => {
    console.group(action.type || action)
    console.debug('action:', action)
    let result = next(action)
    console.debug('new state:', store.getState())
    console.groupEnd()

    return result
}

export default logger
