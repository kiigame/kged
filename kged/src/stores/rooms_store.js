import dispatcher from '../dispatcher'
import {EventEmitter} from 'events'
import * as RoomsActions from '../actions/rooms_actions'

class RoomsStore extends EventEmitter {
    constructor() {
        super();
        this.activeRoom = {'name': 'tähän default huone', 'id': 0};
    }

    handleActions(action) {
        switch (action.type) {
            case RoomsActions.ROOMS_ACTIONS.CHANGE_ROOM: {
                this.activeRoom = action.value;
                this.emit("storeUpdated");
                break;
            }
            default: {

            }
        }
    }
    getActiveRoom() {
        return this.activeRoom
    }
}

const roomsStore = new RoomsStore();
dispatcher.register(roomsStore.handleActions.bind(roomsStore));
export default roomsStore;
