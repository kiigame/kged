import React from 'react';
import 'styles/sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-3 side-container">
                <div className="row flex-grow-1">
                    <div className="col side-submenu">
                        Huoneet
                    </div>
                    <div className="col side-submenu">
                        Esineet
                    </div>
                    <div className="col side-submenu">
                        Interaktiot
                    </div>
                </div>
                <button className="mt-4" type="button">Lisää</button>
                <ul className="mt-4">
                    <li>Huone 1</li>
                    <li>Huone 2</li>
                    <li>Huone 3</li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
