import React from 'react';
import 'styles/preview.css';

class Preview extends React.Component {
    render() {
        return (
            <div className="col-lg-6 order-last pre-container">
                <div className="row pre-controls">
                    <div className="col">
                        Kumoa
                    </div>
                    <div className="col">
                        Tee uudelleen
                    </div>
                    <div className="col">
                        Tallenna
                    </div>
                    <div className="col">
                        Tuo
                    </div>
                    <div className="col">
                        Vie
                    </div>
                </div>
                <div className="row pre-content">
                    <div className="col pre-screen">
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;
