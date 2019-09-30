import React from 'react';
import 'styles/sidebar.css';

import Tabs from './tabs'
import Rooms from './rooms'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 side-container">
                <Tabs>
                    <div label="Huoneet">
                        <Rooms/>
                    </div>
                    <div label="Esineet">
                        Esineet
                    </div>
                    <div label="Interaktiot">
                        Interaktiot
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default Sidebar;
