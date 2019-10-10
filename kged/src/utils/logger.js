const logger = store => next => action => {
    console.group(action.type)
    console.log('action:', action)
    let result = next(action)
    console.log('new state:', store.getState())
    console.groupEnd()

    return result
}

export default logger
