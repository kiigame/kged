import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'styles/create_container.css';

class FileDialog extends React.Component {
    constructor(props) {
        super(props);

    }

    onChange(e) {
        this.props.onFileSelected(e)
    }

    render() {
        return (
            <input
                type="file"
                id="filedialog"
                ref={this.props.fdRef}
                style={{display: "none"}}
                onChange={(e) => this.onChange(e)}
                name="avatar"
                accept="image/*"
            />
        );
    }
}

export default FileDialog;
