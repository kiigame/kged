import dispatcher from '../dispatcher'
import {EventEmitter} from 'events'
import * as SidebarActions from '../actions/sidebar_actions'

class SidebarStore extends EventEmitter {
    constructor() {
        super();
        this.activeView = 'Huoneet';
    }

    handleActions(action) {
        switch (action.type) {
            case SidebarActions.SIDEBAR_ACTIONS.CHANGE_SIDEBAR_VIEW: {
                this.activeView = action.value;
                this.emit("storeUpdated");
                break;
            }
            default: {

            }
        }
    }
    getActiveView() {
        return this.activeView
    }
}

const sidebarStore = new SidebarStore();
dispatcher.register(sidebarStore.handleActions.bind(sidebarStore));
export default sidebarStore;
