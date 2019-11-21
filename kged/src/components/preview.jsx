import React from 'react'
import { connect } from 'react-redux'
import 'styles/preview.scss';

export class Preview extends React.Component {
    render() {
        return (
            <div>
                <div className="row pre-content">
                    <div id="container" className="col pre-screen"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    engine: state.engine,
    isEngineRunning: state.isEngineRunning
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Preview);
