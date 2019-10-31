import React from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Formik, Field, ErrorMessage } from 'formik'

import { setRoomBackgroundImage, updateRoomId } from 'actions/rooms';
import { setFurnitureImage, updateFurnitureId } from 'actions/furnitures';
import { setItemImage, updateItemId } from 'actions/items';
import FileDialog from './file_dialog'
import 'styles/inspector.scss';
import DropdownSelect from './dropdown-select';

// TODO: clean up and remove extra getters, replace with proper data helpers

export class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        }
        this.onFileSelected = this.onFileSelected.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
    }

    handleChange = selectedOption => {
        this.setState({
            selectedOption
            }, () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

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
        if (this.props.entity.activeEntity.attrs.category === 'room') {
            this.props.setRoomBackgroundImage(this.getActiveEntityId(), filePath, objectUrl)
        } else if (this.props.entity.activeEntity.attrs.category === 'furniture') {
            this.props.setFurnitureImage(this.getActiveEntityId(), filePath, objectUrl)
        } else if (this.props.entity.activeEntity.attrs.category === 'item') {
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
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Aloitushuone</label>
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
                                    this.props.updateFurnitureId(this.getActiveEntityId(), values.name)
                                } catch (e) {
                                    actions.setFieldError('name', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label className="change-color-onhover" title="Syötä nimi huonekalulle">Nimi</label>
                                    <Field className="form-control" type="name" name="name" />
                                    <ErrorMessage component="div" className="error-message" name="name" />
                                </div>
                                <label className="change-color-onhover" title="Valitse mihin huoneeseen huonekalu kuuluu">Huonekalun huone</label>
                                <DropdownSelect content={this.props.rooms.rooms} placeholder="Etsi huonetta..."/>
                                <label className="change-color-onhover" title="Huonekalun sijainti huoneessa">Huonekalun sijainti</label>
                                <div className="xy-container">
                                    <div className="col-6 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-981">
                                            X-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" type="x" name="x-value" />
                                    </div>
                                    <div className="col-6 my-2 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-583">
                                            Y-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" type="y" name="y-value" />
                                    </div>
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label change-color-onhover" title="Valitse onko huonekalu näkyvissä?" htmlFor="exampleCheck1">Näkyvissä</label>
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
                                    this.props.updateItemId(this.getActiveEntityId(), values.name)
                                } catch (e) {
                                    actions.setFieldError('name', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label className="change-color-onhover" title="Syötä nimi esinelle">Nimi</label>
                                    <Field className="form-control" type="name" name="name" />
                                    <ErrorMessage component="div" className="error-message" name="name" />
                                </div>
                                <label className="change-color-onhover" title="Valitse mihin huoneeseen esine kuuluu">Esineen huone</label>
                                <DropdownSelect content={this.props.rooms.rooms} placeholder="Etsi huonetta..."/>
                                <label className="change-color-onhover" title="Esineen sijainti huoneessa">Esineen sijainti</label>
                                <div className="xy-container">
                                    <div className="col-6 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-981">
                                            X-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" type="x" name="x-value" />
                                    </div>
                                    <div className="col-6 my-2 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-583">
                                            Y-arvo
                                        </label>
                                        <Field className="form-control col-6 xy-input xy-col" type="y" name="y-value" />
                                    </div>
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label change-color-onhover" title="Valitse onko esine näkyvissä?" htmlFor="exampleCheck1">Näkyvissä</label>
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
    rooms: state.rooms,
    furnitures: state.furnitures,
    entity: state.entity
})
const mapDispatchToProps = dispatch => ({
    setRoomBackgroundImage: (id, path, objUrl) => dispatch(setRoomBackgroundImage(id, path, objUrl)),
    setFurnitureImage: (id, path, objUrl) => dispatch(setFurnitureImage(id, path, objUrl)),
    setItemImage: (id, path, objUrl) => dispatch(setItemImage(id, path, objUrl)),
    updateRoomId: (oldId, newId) => dispatch(updateRoomId(oldId, newId)),
    updateFurnitureId: (oldId, newId) => dispatch(updateFurnitureId(oldId, newId)),
    updateItemId: (oldId, newId) => dispatch(updateItemId(oldId, newId)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
