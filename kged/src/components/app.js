import React from 'react';
import Sidebar from 'components/sidebar';
import Preview from 'components/preview';
import Inspector from 'components/inspector';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/app.css';

class App extends React.Component {
    render() {
        return (
            <div className="app container-fluid">
                <div className="row flex-grow-1">
                    <Sidebar></Sidebar>
                    <Preview></Preview>
                    <Inspector></Inspector>
                </div>
            </div>
        );
    }
}

export default App;
