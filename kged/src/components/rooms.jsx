import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

import { setActiveRoom, addRoom, deleteRoom } from 'actions';

class Rooms extends React.Component {

    isActiveRoom(room) {
        if (this.props.activeRoom && this.props.activeRoom.attrs) {
            return this.props.activeRoom.attrs.id === room.attrs.id;
        }
        return false;
    }

    render() {
        return (
            <div>
                <Button variant="success" className="my-3" onClick={this.props.addRoom}>
                    <FontAwesomeIcon icon="plus" />&nbsp;
                    Lisää
                </Button>
                {this.props.rooms.map((room) => {
                    return (
                        <div
                            id={'rooms-'+room.attrs.id}
                            className="room-name"
                            style={{
                                background: this.isActiveRoom(room) ?
                                    '#727272' :
                                    '#424242'
                            }}
                            key={'rooms-'+room.attrs.id}
                            onClick={() => this.props.onClickRoom(room)}
                        >
                            {room.attrs.id}
                            {this.isActiveRoom(room) &&
                                <span className="trash" onClick={() => this.props.removeRoom(room)}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                            }
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    rooms: state.rooms.rooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = dispatch => ({
    onClickRoom: event => dispatch(setActiveRoom(event)),
    addRoom: event => dispatch(addRoom(event)),
    removeRoom: event => dispatch(deleteRoom(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms);
