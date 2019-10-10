import React from 'react';
import { connect } from 'react-redux'
import 'styles/inspector.scss';

import { setRoomBackgroundImage } from 'actions';
import FileDialog from './file_dialog'

class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeEntity: this.props.activeEntity
        };
        this.onFileSelected = this.onFileSelected.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
    }

    getActiveEntity() {
        if (this.props.entity && this.props.entity.activeEntity &&
            this.props.entity.activeEntity.attrs && this.props.entity.activeEntity.attrs.id) {
            return this.props.entity.activeEntity.attrs.id;
        }
    }

    getActiveView() {
        if (this.props.entity && this.props.entity.activeEntity &&
            this.props.entity.activeEntity.attrs && this.props.entity.activeEntity.attrs.category) {
            return this.props.entity.activeEntity.attrs.category;
        }
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
        this.props.setRoomBackgroundImage(filePath)
    }

    render() {
        console.log('inspector',this.props)
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col">
                        Inspektori
                    </div>

                </div>
                {this.getActiveView() === 'room' &&
                    <div className="ins-props">
                        <div className="input-group">
                            {this.state.activeEntity != {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    Lataa kuva klikkaamalla
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input type="text" value={this.getActiveEntity()} disabled readOnly className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Leveys</span>
                            </div>
                            <input type="number" defaultValue="1280" className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Korkeus</span>
                            </div>
                            <input type="number" defaultValue="720" className="form-control" />
                        </div>
                    </div>
                }
                {this.getActiveView() === 'item' &&
                    <div>Esineet</div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    rooms: state.rooms,
    entity: state.entity
})
const mapDispatchToProps = dispatch => ({
    setRoomBackgroundImage: event => dispatch(setRoomBackgroundImage(event))
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
