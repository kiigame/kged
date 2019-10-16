import React from 'react';
import 'styles/sidebar.scss';

import Tabs from './tabs'
import Rooms from './rooms'
import Furnitures from './furnitures'

export class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 side-container">
                <Tabs>
                    <div label="Huoneet">
                        <Rooms/>
                    </div>
                    <div label="Esineet">
                        <Furnitures/>
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
