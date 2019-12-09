import React from 'react';

// Opens a file dialog for selecting a file
// Receives the following props: the selected file, and ref to inspector.jsx (see react refs)

export class FileDialog extends React.Component {
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
