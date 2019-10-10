import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'styles/rooms.scss';

import { setActiveRoom, addRoom, deleteRoom } from 'actions';
import CreateContainer from './create_container'

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
                <CreateContainer
                    initialState={{name: ''}}
                    addItem={this.props.addRoom}
                    namePlaceholder={'Syötä huoneen nimi'}
                    submitLabel={'Lisää huone'}
                />
                {this.props.rooms.map((room) => {
                    return (
                        <div
                            id={'rooms-'+room.attrs.id}
                            style={{
                                background: this.isActiveRoom(room) ?
                                    '#727272' :
                                    '#424242',
                                padding: '0.15em 0.35em'
                            }}
                            key={'rooms-'+room.attrs.id}
                            onClick={() => this.props.onClickRoom(room)}
                        >
                        <span className="room-name">
                            {room.attrs.id}
                        </span>
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
