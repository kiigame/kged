import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveRoom, setActiveRoom, addRoom, deleteRoom, getRooms } from 'actions/rooms'
import CreateContainer from './create_container'
import 'styles/rooms.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Rooms extends React.Component {

    isActiveRoom(room) {
        if (this.props.activeRoom && this.props.activeRoom.attrs) {
            return this.props.activeRoom.attrs.id === room.attrs.id
        }
    }

    render() {
        return (
            <div>
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addRoom}
                        namePlaceholder={'Syötä huoneen nimi'}
                        submitLabel={'Lisää huone'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option.attrs.id}
                                options={this.props.rooms}
                                placeholder="Etsi huonetta..."/>
                    </div>
                    {/* <input className="form-control col searchbox" placeholder="Etsi..." type="name" name="name" /> */}
                </div>
                <div className="listitem-container">
                    {this.props.rooms.length === 0 &&
                        <div className="empty-list-text">
                            Ei huoneita! Luo uusi huone tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {this.props.rooms.map((room) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveRoom(room) ? 'active-listitem' : '')}
                                key={room.attrs.id}
                                onClick={() => this.props.onClickRoom(room)}
                            >
                                <span className="listitem-name">
                                    {room.attrs.id}
                                </span>
                                {this.isActiveRoom(room) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeRoom(room)
                                        e.stopPropagation()
                                    }}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rooms: getRooms(state),
    activeRoom: getActiveRoom(state)
})

const mapDispatchToProps = dispatch => ({
    onClickRoom: room => dispatch(setActiveRoom(room.attrs.id)),
    addRoom: room => dispatch(addRoom(room)),
    removeRoom: room => dispatch(deleteRoom(room)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms)
