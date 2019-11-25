import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { importProject, exportProject } from 'actions/global';
import { startGame, stopGame } from 'actions/preview.js'
import 'styles/preview.scss';
import 'styles/action_bar.scss';

export class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isStartable: true, isStarting: false }
        this.clickHiddenInput = this.clickHiddenInput.bind(this);
    }

    clickHiddenInput() {
        var input = document.getElementById('hidden-input')
        input.click()
        input.onchange = (e) => {
            this.props.onImport(e.target.files[0])
        }
    }

    onStartGame(e) {
        if (this.state.isStartable) {
            this.setState({isStartable: false, isStarting: true})
            this.props.onStartGame(e)
            // TODO: make this more robust (e.g. konva stage ready callback)
            setTimeout(() => {
                if (this.props.engine) {
                    this.props.engine.init_hit_regions()
                }
            }, 3000)
            setTimeout(() => this.setState({isStarting: false}), 3000)
        }
    }

    onStopGame(e) {
        this.setState({isStartable: false, isStarting: true})
        if (this.props.engine && this.props.engine.stage) {
            this.props.engine.stage.destroy()
        }
        setTimeout(() => this.setState({isStartable: true, isStarting: false}), 1000)
        this.props.onStopGame(e)
    }

    render() {
        return (
            <div className="row pre-controls">
                <div className={'col ' + ((this.state.isStartable && !this.props.isEngineRunning) ? '' : 'disabled')}
                     onClick={e => this.onStartGame(e)}>
                    Käynnistä
                    {this.state.isStarting &&
                        <FontAwesomeIcon className="load-spinner" icon="spinner" spin/>
                    }
                </div>
                <div className={'col ' + (!this.props.isEngineRunning ? 'disabled' : '')}
                     onClick={e => this.onStopGame(e)}>
                    Lopeta
                </div>
                <div className="col" id="import-zip-container" onClick={this.clickHiddenInput}>
                    Tuo
                    <input type="file" accept=".zip" id="hidden-input"/>
                </div>
                <div className="col" onClick={this.props.onExport}>
                    Vie
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    engine: state.preview.engine,
    isEngineRunning: state.preview.isEngineRunning,
})

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(exportProject(event)),
    onImport: event => dispatch(importProject(event)),
    onStartGame: event => dispatch(startGame(event)),
    onStopGame: event => dispatch(stopGame(event))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionBar);
