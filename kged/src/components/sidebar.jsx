import React from 'react';
import 'styles/sidebar.scss';

import Tabs from './tabs'
import Rooms from './rooms'
import Items from './items'
import Furnitures from './furnitures'
import Character from './character'
// import Texts from './texts'
// import Interactions from './interactions'

// Sidebar at the left side of the screen.
// Rooms-, Items- and Furnitures-components function as tabs and their implementations are very similar.
// TODO: Texts and Interactions are commented but could be implemented in the future.

export class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-2 side-container">
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
                    <div label="Päähahmo">
                        <Character/>
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
