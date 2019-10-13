import React from 'react';
import Sidebar from 'components/sidebar';
import Preview from 'components/preview';
import Inspector from 'components/inspector';
import 'styles/app.scss';

var mock_rooms = require('data/rooms.json')['rooms'];

class App extends React.Component {
    render() {
        var default_room = mock_rooms[0]['attrs']
        return (
            <div className="app container-fluid">
                <div className="row flex-grow-1">
                    <Sidebar></Sidebar>
                    <Preview></Preview>
                    <Inspector default_room={default_room}></Inspector>
                </div>
            </div>
        );
    }
}

export default App;
