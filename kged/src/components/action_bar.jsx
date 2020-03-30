import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { importProject, exportProject, setGameName } from 'actions/global';
import { hasStartRoom } from 'actions/rooms';
import { startGame, stopGame } from 'actions/preview.js'
import 'styles/preview.scss';
import 'styles/action_bar.scss';

// ActionBar at the top of the screen.
// Has buttons for running and stopping a game session, and exporting and importing game data.
// isStartable = the user may start the game.
// isLoading = the user has started the game, and the game is loading.

export class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isStartable: true, isLoading: false }
        this.clickHiddenInput = this.clickHiddenInput.bind(this);
    }

    clickHiddenInput() {
        // Input is being hidden to make div clickable without showing the input button
        var input = document.getElementById('hidden-input')
        input.click()
        input.onchange = (e) => {
            this.props.onImport(e.target.files[0])
            this.props.setName(e.target.files[0].name.split(".")[0])
        }
    }

    onStartGame(e) {
        if (!this.props.hasStartRoom) {
            return
        }
        if (this.state.isStartable) {
            this.setState({isStartable: false, isLoading: true})
            this.props.onStartGame(e)
            // setTimeout is used to prevent user from crashing the system in case
            // it takes a while for the engine to start the game.
            // TODO: make this more robust (e.g. konva stage ready callback)
            setTimeout(() => {
                if (this.props.engine) {
                    this.props.engine.init_hit_regions()
                }
            }, 3000)
            setTimeout(() => this.setState({isLoading: false}), 3000)
        }
    }

    onStopGame(e) {
        if (this.state.isStartable || !this.props.isEngineRunning) {
            return
        }
        this.setState({isStartable: false, isLoading: true})
        if (this.props.engine && this.props.engine.stage) {
            this.props.engine.stage.destroy()
        }
        setTimeout(() => this.setState({isStartable: true, isLoading: false}), 1000)
        this.props.onStopGame(e)
    }

    render() {
        return (
            <div className="row pre-controls">
                <div className={'col ' + ((this.state.isStartable && !this.props.isEngineRunning && this.props.hasStartRoom) ? '' : 'disabled')}
                     onClick={e => this.onStartGame(e)}
                     title={this.props.hasStartRoom ? undefined : 'Pelillä täytyy olla yksi aloitushuone jotta se voidaan käynnistää! Aloitushuoneen voi asettaa valitulle huoneelle inspektorista.'}>
                    Käynnistä
                    {this.state.isLoading &&
                        <FontAwesomeIcon className="load-spinner" icon="spinner" spin/>
                    }
                </div>
                <div className={'col ' + (!this.props.isEngineRunning ? 'disabled' : '')}
                     onClick={e => this.onStopGame(e)}>
                    Lopeta
                </div>
                <div className="col" id="import-zip-container" onClick={this.clickHiddenInput}>
                    Lataa
                    <input type="file" accept=".zip" id="hidden-input"/>
                </div>
                <div className="col" onClick={this.props.onExport}>
                    Tallenna
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    engine: state.preview.engine,
    isEngineRunning: state.preview.isEngineRunning,
    hasStartRoom: hasStartRoom(state)
})

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(exportProject(event)),
    onImport: event => dispatch(importProject(event)),
    onStartGame: event => dispatch(startGame(event)),
    onStopGame: event => dispatch(stopGame(event)),
    setName: name => dispatch(setGameName(name))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionBar);
