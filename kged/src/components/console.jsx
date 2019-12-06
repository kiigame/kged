import React from 'react'
import { connect } from 'react-redux'
import 'styles/console.scss';

// Game sessions run through component.

export class Console extends React.Component {
    render() {
        return (
            <div>
                <div className="console-container">
                    { this.props.errors && this.props.errors.map((e, i) =>
                        <div key={i} className="console-error">
                            <b>VIRHE:</b> {e.message}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.global.errors
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Console);
