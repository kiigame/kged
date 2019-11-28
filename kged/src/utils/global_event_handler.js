const globalEventHandler = store => next => action => {

    // show confirmation dialog when unloading page (e.g. reloading or closing tab).
    // uses a static function reference to allow removing the listener and
    // prevent listener duplication
    if (process && process.env && process.env.NODE_ENV !== 'development') {
        window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return next(action);
}

function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = '';
}

export default globalEventHandler;
