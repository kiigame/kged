const logger = store => next => action => {
    // middleware that can be used to inspect state changes

    // console.group(action.type || action)
    // console.debug('action:', action)
    let result = next(action)
    // console.debug('new state:', store.getState())
    // console.groupEnd()

    return result
}

export default logger
