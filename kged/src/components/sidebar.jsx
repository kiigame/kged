import React from 'react';
import 'styles/sidebar.scss';

import Tabs from './tabs'
import Rooms from './rooms'
import Items from './items'
import Furnitures from './furnitures'
// import Texts from './texts'
// import Interactions from './interactions'

export class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 side-container">
                <Tabs>
                    <div label="Huoneet">
                        <Rooms/>
                    </div>
                    <div label="Esineet">
                        <Items/>
                    </div>
                    <div label="Huonekalut">
                        <Furnitures/>
                    </div>
                    {/* <div label="Interaktiot">
                        <Interactions/>
                    </div>
                    <div label="Tekstit">
                        <Texts/>
                    </div> */}
                </Tabs>
            </div>
        );
    }
}

export default Sidebar;
