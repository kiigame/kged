import React from 'react';
import Sidebar from 'components/sidebar';
import ActionBar from 'components/action_bar';
import Preview from 'components/preview';
import Console from 'components/console';
import Inspector from 'components/inspector';
import 'styles/app.scss';
import TitleBar from 'components/titlebar';

// Parent component of other components.
// Sidebar = left side of the screen.
// TitleBar = Title of the game.
// ActionBar & Preview = middle of the screen.
// Inspector = right side of the screen.

class App extends React.Component {
    render() {
        return (
            <div className="app container-fluid">
                <div className="row flex-grow-1">
                    <Sidebar></Sidebar>
                    <div className="col-lg-7 order-last pre-container">
                        <TitleBar></TitleBar>
                        <ActionBar></ActionBar>
                        <Preview></Preview>
                        <Console></Console>
                    </div>
                    <Inspector></Inspector>
                </div>
            </div>
        );
    }
}

export default App;
