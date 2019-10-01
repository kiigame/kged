import dispatcher from '../dispatcher'
import {EventEmitter} from 'events'
import * as RoomsActions from '../actions/rooms_actions'

class RoomsStore extends EventEmitter {
    constructor() {
        super();
        this.rooms = [];
        this.activeRoom = {'name': 'tähän default huone', 'id': 0};
    }

    handleActions(action) {
        switch (action.type) {
            case RoomsActions.ROOMS_ACTIONS.SET_ROOMS: {
                this.rooms = action.value;
                this.emit("storeUpdated");
                break;
            }
            case RoomsActions.ROOMS_ACTIONS.CHANGE_ROOM: {
                this.activeRoom = action.value;
                this.emit("storeUpdated");
                break;
            }
            case RoomsActions.ROOMS_ACTIONS.UPDATE_ROOM: {
                let room = this.rooms.find(r => r.id === action.value.id);
                if (room) {
                    room.name = action.value.name;
                }
                this.activeRoom = action.value;
                this.emit("storeUpdated");
                break;
            }
            default: {

            }
        }
    }

    getRooms() {
        return this.rooms;
    }

    getActiveRoom() {
        return this.activeRoom;
    }
}

const roomsStore = new RoomsStore();
dispatcher.register(roomsStore.handleActions.bind(roomsStore));
export default roomsStore;
