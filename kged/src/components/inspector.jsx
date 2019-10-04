import React from 'react';
import { connect } from 'react-redux'
import 'styles/inspector.scss';
import RoomsStore from 'stores/rooms_store'
import * as RoomsActions from 'actions/rooms_actions'
import SidebarStore from 'stores/sidebar_store'
import { getRoom } from '../actions/actions'

class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: RoomsStore.getActiveRoom(),
            activeView: SidebarStore.getActiveView()
        }
    }

    componentDidMount() {
        RoomsStore.on('storeUpdated', this.updateActiveRoom);
        SidebarStore.on('storeUpdated', this.updateActiveView);
        const { dispatch } = this.props
        // dispatch(getRoom(this.props.default_room))
    }

    componentWillUnmount() {
        RoomsStore.off('storeUpdated', this.updateActiveRoom);
        SidebarStore.removeListener('storeUpdated', this.updateActiveView);
    }

    updateActiveRoom = () => {
        this.setState({
            activeRoom: RoomsStore.getActiveRoom()
        })
    }

    updateActiveView = () => {
        this.setState({
            activeView: SidebarStore.getActiveView()
        })
    }

    updateRoom = (event) => {
        RoomsActions.updateRoom(this.state.activeRoom.id, event.target.value);
    }

    render() {
        const activeView = this.state.activeView;
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col">
                        Inspektori
                    </div>
                </div>
                {activeView === 'Huoneet' &&
                    <div className="ins-props">
                        <div className="input-group">
                            <div className="input-img">
                            </div>
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input type="text" value={this.state.activeRoom.id} disabled readOnly className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Nimi</span>
                            </div>
                            <input type="text" placeholder="Huoneen nimi" value={this.state.activeRoom.name} onChange={this.updateRoom} className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Leveys</span>
                            </div>
                            <input type="number" defaultValue="1280" className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Korkeus</span>
                            </div>
                            <input type="number" defaultValue="720" className="form-control" />
                        </div>
                    </div>
                }
                {activeView === 'Esineet' &&
                    <div>Esineet</div>
                }
                {activeView === 'Interaktiot' &&
                    <div>Interaktiot</div>
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    rooms: state.rooms
})
export default connect(mapStateToProps)(Inspector);
