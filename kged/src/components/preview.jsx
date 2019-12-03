import React from 'react'
import { connect } from 'react-redux'
import 'styles/preview.scss';

// Game sessions run through component.

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
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Preview);
