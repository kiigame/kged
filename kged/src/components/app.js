import React from 'react';
import Sidebar from 'components/sidebar';
import ActionBar from 'components/action_bar';
import Preview from 'components/preview';
import Inspector from 'components/inspector';
import 'styles/app.scss';

class App extends React.Component {
    render() {
        return (
            <div className="app container-fluid">
                <div className="row flex-grow-1">
                    <Sidebar></Sidebar>
                    <div className="col-lg-6 order-last pre-container">
                        <ActionBar/>
                        <Preview></Preview>
                    </div>
                    <Inspector></Inspector>
                </div>
            </div>
        );
    }
}

export default App;
