import React from 'react';
import 'styles/sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 side-container">
                <div className="row side-nav">
                    <div className="col side-nav-item">
                        Huoneet
                    </div>
                    <div className="col side-nav-item">
                        Esineet
                    </div>
                    <div className="col side-nav-item">
                        Interaktiot
                    </div>
                </div>
                <button className="btn mt-4" type="button">Lisää</button>
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
