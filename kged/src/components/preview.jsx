import React from 'react';
import { connect } from 'react-redux';
import 'styles/preview.scss';
import { saveRooms } from 'actions';

class Preview extends React.Component {
    render() {
        return (
            <div className="col-lg-6 order-last pre-container">
                <div className="row pre-controls">
                    <div className="col">
                        Kumoa
                    </div>
                    <div className="col">
                        Toista
                    </div>
                    <div className="col">
                        Tallenna
                    </div>
                    <div className="col">
                        Tuo
                    </div>
                    <div className="col" onClick={this.props.onExport}>
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(saveRooms(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);
