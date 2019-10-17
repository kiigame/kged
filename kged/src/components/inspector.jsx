import React from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Formik, Field, ErrorMessage } from 'formik'

import { setRoomBackgroundImage, updateRoomId } from 'actions/rooms';
import FileDialog from './file_dialog'
import 'styles/inspector.scss';

// TODO: clean up and remove extra getters, replace with proper data helpers

export class Inspector extends React.Component {
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
        var room_placeholder = null
        if (this.props.rooms.activeRoom.children) {
            room_placeholder = this.props.rooms.activeRoom.children[0].attrs.src
        }
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
                                    <img alt="" src={room_placeholder}/>
                                    <span className="input-img-name" >
                                        {this.getBackgroundName()}
                                    </span>
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={{ name: this.getActiveEntityId() }}
                            validate={values => {
                                let errors = {}
                                if (!values.name) {
                                    errors.name = 'Nimi on pakollinen'
                                }
                                if (values.name && /\s/.test(values.name)) {
                                    errors.name = 'Nimessä ei saa olla välilyöntejä'
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateRoomId(this.getActiveEntityId(), values.name)
                                } catch (e) {
                                    actions.setFieldError('name', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label>Nimi</label>
                                    <Field className="form-control" type="name" name="name" />
                                    <ErrorMessage component="div" className="error-message" name="name" />
                                </div>
                                <div className="item-edit-actions">
                                    <Button type="submit" variant="success" className="mr-2">
                                        Tallenna
                                    </Button>
                                    <Button variant="secondary" onClick={formProps.handleReset}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
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
    setRoomBackgroundImage: (id, path) => dispatch(setRoomBackgroundImage(id, path)),
    updateRoomId: (oldId, newId) => dispatch(updateRoomId(oldId, newId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
