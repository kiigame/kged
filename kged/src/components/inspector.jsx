import React from 'react';
import 'styles/inspector.scss';

class Inspector extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col">
                        Inspektori
                    </div>
                </div>
                <div className="ins-props">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Nimi</span>
                        </div>
                        <input type="text" defaultValue="Huone 2" className="form-control" />
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Leveys</span>
                        </div>
                        <input type="number" defaultValue="1280" className="form-control" />
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Korkeus</span>
                        </div>
                        <input type="number" defaultValue="720" className="form-control" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Inspector;
