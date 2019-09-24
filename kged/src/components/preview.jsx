import React from 'react';
import 'styles/preview.css';

class Preview extends React.Component {
    render() {
        return (
            <div className="col-6 pre-container">
                <div className="row flex-grow-1">
                    <div className="col">
                        Undo
                    </div>
                    <div className="col">
                        Redo
                    </div>
                    <div className="col">
                        Tallenna
                    </div>
                    <div className="col">
                        Reset
                    </div>
                    <div className="col">
                        Import
                    </div>
                    <div className="col">
                        Export
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;
