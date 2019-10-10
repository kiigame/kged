import React from 'react';
import { connect } from 'react-redux'
import 'styles/inspector.scss';

import { setRoomBackgroundImage } from 'actions';
import FileDialog from './file_dialog'

// TODO: clean up and remove extra getters, replace with proper data helpers

class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
    }

    getActiveEntity() {
        if (this.props.entity && this.props.entity.activeEntity) {
            return this.props.entity.activeEntity;
        }
    }

    getActiveEntityId() {
        const activeEntity = this.getActiveEntity()
        if (activeEntity) {
            return activeEntity.attrs ? activeEntity.attrs.id : undefined;
        }
    }

    getActiveView() {
        const activeEntity = this.getActiveEntity()
        if (activeEntity && activeEntity.attrs && activeEntity.attrs.category) {
            return activeEntity.attrs.category;
        }
    }

    getBackgroundName() {
        const activeEntity = this.getActiveEntity()
        if (activeEntity && activeEntity.children) {
            const bg = activeEntity.children.find(c => c.attrs && c.attrs.category === 'room_background')
            if (bg) {
                return bg.attrs.src
            }
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
        this.props.setRoomBackgroundImage(this.getActiveEntityId(), filePath)
    }

    render() {
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
                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                <span style={{'display': 'block', 'fontSize': '0.75em'}}>
                                    {this.getBackgroundName()}
                                </span>
                                    Lataa kuva klikkaamalla
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input type="text" title={this.getActiveEntityId()} value={this.getActiveEntityId()} readOnly className="form-control" />
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
    setRoomBackgroundImage: (id, path) => dispatch(setRoomBackgroundImage(id, path))
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
