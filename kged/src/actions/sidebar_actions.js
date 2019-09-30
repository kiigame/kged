import dispatcher from '../dispatcher'

export const SIDEBAR_ACTIONS = {
    CHANGE_SIDEBAR_VIEW: 'sidebarActions.ChangeSidebarView'
}

export function changeSidebarView (view) {
    dispatcher.dispatch({
        type: SIDEBAR_ACTIONS.CHANGE_SIDEBAR_VIEW,
        value: view
    })
}
