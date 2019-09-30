import React from 'react';
import 'styles/inspector.scss';
import RoomsStore from '../stores/rooms_store'
import SidebarStore from '../stores/sidebar_store'

class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: RoomsStore.getActiveRoom(),
            activeView: SidebarStore.getActiveView()
        }
    }

    componentDidMount() {
        RoomsStore.on("storeUpdated", this.updateActiveRoom);
        SidebarStore.on("storeUpdated", this.updateActiveView);
    }

    componentWillUnmount() {
        RoomsStore.off("storeUpdated", this.updateActiveRoom);
        SidebarStore.removeListener("storeUpdated", this.updateActiveView);
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

    render() {
        var activeRoomName = this.state.activeRoom.name
        console.log(activeRoomName)
        var activeView = this.state.activeView
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
                            <div className="input-group-prepend">
                                <span className="input-group-text">Nimi</span>
                            </div>
                            <input type="text" defaultValue={activeRoomName} className="form-control" />
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

export default Inspector;
