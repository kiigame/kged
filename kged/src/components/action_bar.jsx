import React from 'react';
import { connect } from 'react-redux';

import 'styles/preview.scss';
import 'styles/action_bar.scss';
import { importProject, exportProject } from 'actions/global';

export class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.clickHiddenInput = this.clickHiddenInput.bind(this);
    }

    clickHiddenInput() {
        var input = document.getElementById('hidden-input')
        input.click()
        input.onchange = (e) => {
            this.props.onImport(e.target.files[0])
        }
    }

    render() {
        return (
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

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(exportProject(event)),
    onImport: event => dispatch(importProject(event))
})

export default connect(
    null,
    mapDispatchToProps
)(ActionBar);
