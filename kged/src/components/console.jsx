import React from 'react'
import { connect } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clearEvents } from 'actions/global';
import 'styles/console.scss';

// Game sessions run through component.

export class Console extends React.Component {
    constructor(props) {
        super(props)
        this.state = { consoleOpen: true }
    }

    render() {
        const toggleIcon = this.state.consoleOpen
            ? <FontAwesomeIcon icon="chevron-up" />
            : <FontAwesomeIcon icon="chevron-down" />

        return (
            <div>
                <div className="row console-container">
                    <Accordion defaultActiveKey="0" style={{ width: '100%' }}>
                        <div className="console-header">
                            <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                                onClick={() => this.setState({ consoleOpen: !this.state.consoleOpen})}
                                style={{ color: '#e0e0e0' }}>
                                { toggleIcon } Konsoli ({this.props.events ? this.props.events.length : 0})
                            </Accordion.Toggle>
                            <span
                                className="btn btn-link console-clear"
                                title="Tyhjennä konsoli"
                                onClick={() => this.props.clearConsole()}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </span>
                        </div>
                        <Accordion.Collapse eventKey={ this.state.consoleOpen && '0' }>
                            <div className="console-messages">
                                { this.props.events && this.props.events.map((e, i) =>
                                    e.type !== 'ERROR'
                                    ?
                                        <div key={i} className="console-message">
                                            {e.timestamp} {e.message}
                                        </div>
                                    :
                                        <div key={i} className="console-error">
                                            {e.timestamp} <b>VIRHE:</b> {e.message}
                                        </div>
                                )}
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    events: state.global.events
})

const mapDispatchToProps = dispatch => ({
    clearConsole: event => dispatch(clearEvents(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Console);
