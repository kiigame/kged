import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var mock_furnitures = require('./mock.json');


class Furnitures extends React.Component {
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
        var furnitures = mock_rooms['furnitures'];
        var activeRoomId = this.state.activeRoom.id

        return (
            <div>
                <button className="btn mt-4" type="button">
                    <FontAwesomeIcon icon="plus" />&nbsp;
                    Lisää
                </button>
                {rooms.map((room, i) => {
                    return (
                        <div
                            id={'furnitures'+i}
                            className="furniture-name"
                            style={activeFurnitureId === i ? {background: '#727272'} : {background: '#424242'}}
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


export default Furnitures;
