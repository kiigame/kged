import React from 'react';
import { connect } from 'react-redux';
import 'styles/preview.css';
import FileDialog from './file_dialog'
import { saveRooms } from 'actions';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
    }

    openFileDialog() {
        this.fileDialogRef.current.click();
    }

    onFileSelected(e) {
        let filePath = e.target.value
        // firefox <input type="file"> adds a fakepath for security reasons
        // the line below will replace this path with an empty
        // by this, we get the name of the file only
        filePath = filePath.replace("C:\\fakepath\\","")
        console.log(filePath)
    }

    render() {
        return (
            <div className="col-lg-6 order-last pre-container">
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
                    <div className="col" onClick={this.openFileDialog}>
                        <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                        Tuo
                    </div>
                    <div className="col" onClick={this.props.onExport}>
                        Vie
                    </div>
                </div>
                <div className="row pre-content">
                    <div className="col pre-screen">
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(saveRooms(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);
