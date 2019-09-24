import React from 'react';
import 'styles/inspector.css';

class Inspector extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                INSPECTOR
                <div className="ins-props">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Name</span>
                        </div>
                        <input type="text" defaultValue="Huone 2" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Width</span>
                        </div>
                        <input type="number" defaultValue="1280" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Height</span>
                        </div>
                        <input type="number" defaultValue="720" className="form-control" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Inspector;
