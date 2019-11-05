import React from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Formik, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import { set } from 'lodash/fp'

import { getActiveEntity } from 'actions/entity'
import { setRoomBackgroundImage, updateRoom, getRooms } from 'actions/rooms'
import { setFurnitureImage, updateFurniture, getFurnitures } from 'actions/furnitures'
import { setItemImage, updateItem, getItems } from 'actions/items'
import FileDialog from './file_dialog'
import 'styles/inspector.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

// TODO: clean up and remove extra getters, replace with proper data helpers

export class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
    }

    getActiveEntity() {
        if (this.props.activeEntity) {
            return this.props.activeEntity;
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

    getBackground() {
        const activeEntity = this.getActiveEntity()
        const activeView = this.getActiveView()

        if (activeEntity) {
            if (activeView === 'room' && activeEntity.children) {
                const bg = activeEntity.children.find(c => c.attrs && c.attrs.category === 'room_background')
                if (bg) {
                    return bg.attrs
                }
            } else if (activeView === 'furniture') {
                return activeEntity.attrs
            } else if (activeView === 'item') {
                return activeEntity.attrs
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
        const file = e.target.files[0]
        const objectUrl = window.URL.createObjectURL(file)
        if (this.props.activeEntity.attrs.category === 'room') {
            this.props.setRoomBackgroundImage(this.getActiveEntityId(), filePath, objectUrl)
        } else if (this.props.activeEntity.attrs.category === 'furniture') {
            this.props.setFurnitureImage(this.getActiveEntityId(), filePath, objectUrl)
        } else if (this.props.activeEntity.attrs.category === 'item') {
            this.props.setItemImage(this.getActiveEntityId(), filePath, objectUrl)
        }
    }

    render() {
        let bg = this.getBackground()
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col ins-header">
                        Inspektori
                    </div>
                </div>
                {this.getActiveView() === 'room' &&
                    <div className="ins-props">
                        <div className="input-group">
                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    {bg
                                        ?
                                        ( <img alt="" src={bg.url} height={bg.height} width={bg.width}/>)
                                        :
                                        ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.getActiveEntity()}
                            validate={values => {
                                let errors = {}
                                if (!values.attrs.id) {
                                    errors = set('attrs.id', 'Nimi on pakollinen', errors)
                                }
                                if (values.attrs.id && /\s/.test(values.attrs.id)) {
                                    errors = set('attrs.id', 'Nimessä ei saa olla välilyöntejä', errors)
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateRoom(this.getActiveEntityId(), values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label>Nimi</label>
                                    <Field className="form-control" type="name" name="attrs.id" />
                                    <ErrorMessage component="div" className="error-message" name="attrs.id" />
                                </div>
                                <div className="form-check my-3">
                                    <Field type="checkbox" className="form-check-input" id="startRoom"/>
                                    <label className="form-check-label" htmlFor="startRoom">Aloitushuone</label>
                                </div>
                                <div className="item-edit-actions">
                                    <Button type="submit" variant="success" disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button variant="secondary" className="ml-2" onClick={formProps.handleReset} disabled={!formProps.dirty}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
                    </div>
                }
                {this.getActiveView() === 'furniture' &&
                    <div className="ins-props">
                        <div className="input-group">

                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    {bg
                                        ?
                                        ( <img alt="" src={bg.url} height={bg.height} width={bg.width}/>)
                                        :
                                        ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.getActiveEntity()}
                            validate={values => {
                                let errors = {}
                                if (!values.attrs.id) {
                                    errors = set('attrs.id', 'Nimi on pakollinen', errors)
                                }
                                if (values.attrs.id && /\s/.test(values.attrs.id)) {
                                    errors = set('attrs.id', 'Nimessä ei saa olla välilyöntejä', errors)
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateFurniture(this.getActiveEntityId(), values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label className="change-color-onhover" title="Syötä nimi huonekalulle">Nimi</label>
                                    <Field className="form-control" type="name" name="attrs.id" />
                                    <ErrorMessage component="div" className="error-message" name="attrs.id" />
                                </div>
                                <label className="change-color-onhover" title="Valitse mihin huoneeseen huonekalu kuuluu">Huonekalun huone</label>
                                <Select styles={defaultSelectStyles}
                                        value={formProps.selectedRoom}
                                        getOptionLabel={(option)=>option.attrs.id}
                                        options={this.props.rooms}
                                        onChange={e => formProps.setFieldValue('selectedRoom', e.attrs.id)}
                                        placeholder="Etsi huonetta..."/>
                                <label className="change-color-onhover" title="Huonekalun sijainti huoneessa">Huonekalun sijainti</label>
                                <div className="xy-container">
                                    <div className="col-6 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-981">
                                            X-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" min="0" type="number" name="attrs.x" />
                                    </div>
                                    <div className="col-6 my-2 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-583">
                                            Y-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" min="0" type="number" name="attrs.y" />
                                    </div>
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="visibleCheck"/>
                                    <label className="form-check-label change-color-onhover" title="Valitse onko huonekalu näkyvissä?" htmlFor="visibleCheck">Näkyvissä</label>
                                </div>
                                <div className="item-edit-actions">
                                    <Button type="submit" variant="success" disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button variant="secondary" className="ml-2" onClick={formProps.handleReset} disabled={!formProps.dirty}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
                    </div>
                }
                {this.getActiveView() === 'item' &&
                    <div className="ins-props">
                        <div className="input-group">

                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    {bg
                                        ?
                                        ( <img alt="" src={bg.url} height={bg.height} width={bg.width}/>)
                                        :
                                        ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.getActiveEntity()}
                            validate={values => {
                                let errors = {}
                                if (!values.attrs.id) {
                                    errors = set('attrs.id', 'Nimi on pakollinen', errors)
                                }
                                if (values.attrs.id && /\s/.test(values.attrs.id)) {
                                    errors = set('attrs.id', 'Nimessä ei saa olla välilyöntejä', errors)
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateItem(this.getActiveEntityId(), values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label className="change-color-onhover" title="Syötä nimi esinelle">Nimi</label>
                                    <Field className="form-control" type="name" name="attrs.id" />
                                    <ErrorMessage component="div" className="error-message" name="attrs.id" />
                                </div>
                                <div className="form-check my-3">
                                    <Field type="checkbox" id="visibleCheck" className="form-check-input" name="attrs.visible"/>
                                    <label className="form-check-label change-color-onhover" title="Valitse onko esine näkyvissä?" htmlFor="visibleCheck">Näkyvissä</label>
                                </div>
                                <div className="item-edit-actions">
                                    <Button type="submit" variant="success" disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button variant="secondary" className="ml-2" onClick={formProps.handleReset} disabled={!formProps.dirty}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    rooms: getRooms(state),
    furnitures: getFurnitures(state),
    activeEntity: getActiveEntity(state),
    items: getItems(state)
})
const mapDispatchToProps = dispatch => ({
    setRoomBackgroundImage: (id, path, objUrl) => dispatch(setRoomBackgroundImage(id, path, objUrl)),
    setFurnitureImage: (id, path, objUrl) => dispatch(setFurnitureImage(id, path, objUrl)),
    setItemImage: (id, path, objUrl) => dispatch(setItemImage(id, path, objUrl)),
    updateRoom: (oldId, room) => dispatch(updateRoom(oldId, room)),
    updateFurniture: (oldId, furniture) => dispatch(updateFurniture(oldId, furniture)),
    updateItem: (oldId, item) => dispatch(updateItem(oldId, item)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
