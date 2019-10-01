import React from 'react';
import * as RoomsActions from 'actions/rooms_actions';
import RoomsStore from 'stores/rooms_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

var mock_rooms = require('./mock.json');


class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        var rooms = mock_rooms['rooms'];
        var activeRoomId = this.state.activeRoom.id

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
                            style={activeRoomId === i ? {background: '#727272'} : {background: '#424242'}}
                            key={i}
                            onClick={() => this.onClickRoom(room,i)}
                        >
                            {room.name}
                            <span className="trash"><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                        </div>
                    )

                })}
            </div>
        );
    }
}


export default Rooms;
