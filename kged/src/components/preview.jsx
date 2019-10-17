import React from 'react';
import { connect } from 'react-redux';
import 'styles/preview.scss';

export class Preview extends React.Component {
    render() {
        return (
            <div className="row pre-content">
                <div className="col pre-screen">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

export default connect(
    mapStateToProps,
)(Preview);
