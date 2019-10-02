import React from 'react';
import * as RoomsActions from 'actions/rooms_actions';
import RoomsStore from 'stores/rooms_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';


class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.mock_rooms = require('./mock.json')['rooms'];
        RoomsActions.setRooms(this.mock_rooms);
        if (this.mock_rooms && this.mock_rooms.length) {
            RoomsActions.changeRoom(this.mock_rooms[0]);
        }
        this.state = {
            rooms: RoomsStore.getRooms(),
            activeRoom: RoomsStore.getActiveRoom()
        }
    }

    componentDidMount() {
        RoomsStore.on("storeUpdated", this.updateActiveRoom);
        RoomsStore.on("storeUpdated", this.updateRooms);
    }

    componentWillUnmount() {
        RoomsStore.removeListener("storeUpdated", this.updateActiveRoom);
        RoomsStore.removeListener("storeUpdated", this.updateRooms);
    }

    updateActiveRoom = () => {
        this.setState({
            activeRoom: RoomsStore.getActiveRoom()
        })
    }

    updateRooms = () => {
        this.setState({
            rooms: RoomsStore.getRooms()
        })
    }

    onClickRoom(room) {
        RoomsActions.changeRoom(room);
    }

    removeRoom(room) {
        RoomsActions.removeRoom(room.id);
    }

    render() {
        let rooms = this.state.rooms;
        const activeRoomId = this.state.activeRoom.id;

        return (
            <div>
                <Button variant="success" className="my-3">
                    <FontAwesomeIcon icon="plus" />&nbsp;
                    Lisää
                </Button>
                {rooms.map((room) => {
                    return (
                        <div
                            id={'rooms'+room.id}
                            className="room-name"
                            style={{background: activeRoomId === room.id ? '#727272' : '#424242'}}
                            key={room.id}
                            onClick={() => this.onClickRoom(room)}
                        >
                            {room.name}
                            {activeRoomId === room.id &&
                                <span className="trash" onClick={() => this.removeRoom(room)}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                            }
                        </div>
                    )

                })}
            </div>
        );
    }
}


export default Rooms;
