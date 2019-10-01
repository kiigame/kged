import React from 'react';
import * as RoomsActions from 'actions/rooms_actions';
import RoomsStore from 'stores/rooms_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';


class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.mock_rooms = require('./mock.json');
        RoomsActions.setRooms(this.mock_rooms['rooms']);
        this.state = {
            rooms: RoomsStore.getRooms(),
            activeRoom: RoomsStore.getActiveRoom()
        }
    }

    componentDidMount() {
        RoomsStore.on("storeUpdated", this.updateActiveRoom);
    }

    componentWillUnmount() {
        RoomsStore.removeListener("storeUpdated", this.updateActiveRoom);
    }

    updateActiveRoom = () => {
        this.setState({
            activeRoom: RoomsStore.getActiveRoom()
        })
    }

    onClickRoom(room,index) {
        RoomsActions.changeRoom(room.name,index)
    }

    render() {
        let rooms = this.state.rooms;
        const activeRoomId = this.state.activeRoom.id

        return (
            <div>
                <Button variant="success" className="my-3">
                    <FontAwesomeIcon icon="plus" />&nbsp;
                    Lisää
                </Button>
                {rooms.map((room, i) => {
                    return (
                        <div
                            id={'rooms'+i}
                            className="room-name"
                            style={{background: activeRoomId === i ? '#727272' : '#424242'}}
                            key={i}
                            onClick={() => this.onClickRoom(room,i)}
                        >
                            {room.name}
                            {activeRoomId === i &&
                                <span className="trash"><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                            }
                        </div>
                    )

                })}
            </div>
        );
    }
}


export default Rooms;
