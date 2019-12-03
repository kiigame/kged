import React from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Formik, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import { set } from 'lodash/fp'

import { getActiveEntity, getActiveEntityCategory, getActiveEntityId } from 'actions/entity'
import { setRoomBackgroundImage, updateRoom, getRooms } from 'actions/rooms'
import { setFurnitureImage, updateFurniture, getFurnitures } from 'actions/furnitures'
import { setItemImage, updateItem, getItems } from 'actions/items'
import { deleteExamineText } from 'actions/texts'
import { setDoorInteraction, deleteInteraction, setExamineInteraction } from 'actions/interactions'
import FileDialog from './file_dialog'
import 'styles/inspector.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Inspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: '100%', overflow: 'auto' };
        this.onFileSelected = this.onFileSelected.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileDialogRef = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    // componentDidMount() {
    //     this.updateWindowDimensions();
    //     window.addEventListener('resize', this.updateWindowDimensions);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.updateWindowDimensions);
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     if (prevProps.activeEntityId !== this.props.activeEntityId) {
    //         this.updateWindowDimensions();
    //         window.addEventListener('resize', this.updateWindowDimensions);
    //     }
    //     return null
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeEntityId !== this.props.activeEntityId) {
            this.updateWindowDimensions();
        }
    }

    updateWindowDimensions() {
        if (document.getElementsByClassName('ins-props') && document.getElementsByClassName('ins-props')[0] && document.getElementsByClassName('ins-props')[0].clientHeight) {
            var windowHeight = window.innerHeight;
            var inspectorHeight = document.getElementsByClassName('ins-props')[0].clientHeight
            if (inspectorHeight > windowHeight) {
                this.setState({ height: windowHeight });
            }
        }
    }

    getImage() {
        const activeEntity = this.props.activeEntity
        const activeView = this.props.activeEntityCategory

        if (activeEntity) {
            if (activeView === 'room' && activeEntity.children) {
                const img = activeEntity.children.find(c => c.attrs && c.attrs.category === 'room_background')
                if (img) {
                    return img.attrs
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
            this.props.setRoomBackgroundImage(this.props.activeEntityId, filePath, objectUrl)
        } else if (this.props.activeEntity.attrs.category === 'furniture') {
            this.props.setFurnitureImage(this.props.activeEntityId, filePath, objectUrl)
        } else if (this.props.activeEntity.attrs.category === 'item') {
            this.props.setItemImage(this.props.activeEntityId, filePath, objectUrl)
        }
    }

    render() {
        var inspectorHeight = {
            height: this.state.height,
            overflow: 'auto'
        }
        const SelectField = (formProps) => {
            return (
                <Select styles={defaultSelectStyles}
                    name="selectedRoom"
                    value={formProps.field.value}
                    defaultValue={formProps.field.value.attrs.id}
                    getOptionLabel={(option)=>option.attrs.id}
                    options={this.props.rooms}
                    noOptionsMessage={() => 'Ei tuloksia'}
                    onChange={e => formProps.form.setFieldValue('selectedRoom', {'attrs': {'id':e.attrs.id}})}
                    placeholder="Etsi huonetta..."/>
            )
        }
        let img = this.getImage()
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container" style={inspectorHeight}>
                <div className="row">
                    <div className="col ins-header">
                        Inspektori
                    </div>
                </div>
                {this.props.activeEntityCategory === 'room' && this.props.activeEntity &&
                    <div className="ins-props">
                        <div className="input-group">
                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    { !img &&
                                        ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                    {img && img.url &&
                                        ( <img
                                            alt=""
                                            src={img.url}
                                            height={img.height}
                                            width={img.width}
                                        /> )
                                    }
                                    {img && img.src && !img.url &&
                                        ( <span>Kuvaa ei voitu ladata</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.props.activeEntity}
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
                                    this.props.updateRoom(this.props.activeEntityId, values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => {
                                return (
                                    <form onSubmit={formProps.handleSubmit}>
                                        <div className="form-group">
                                            <label
                                                className="change-color-onhover"
                                                title="Syötä nimi huoneelle">
                                                Nimi
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="name"
                                                name="attrs.id"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="error-message"
                                                name="attrs.id"
                                            />
                                        </div>
                                        <div className="form-check my-3">
                                            <Field
                                                key={`${formProps.values.attrs.id}-start`}
                                                type="checkbox"
                                                id="startRoom"
                                                className="form-check-input"
                                                checked={formProps.values.attrs.start}
                                                name="attrs.start"
                                            />
                                            <label
                                                className="form-check-label change-color-onhover"
                                                title="Valitse aloitetaanko peli tästä huoneesta"
                                                htmlFor="startRoom">
                                                Aloitushuone
                                            </label>
                                        </div>
                                        <div className="item-edit-actions">
                                            <Button
                                                type="submit"
                                                variant="success"
                                                disabled={!formProps.dirty}>
                                                Tallenna
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                className="ml-2"
                                                onClick={formProps.handleReset}
                                                disabled={!formProps.dirty}>
                                                Peruuta
                                            </Button>
                                        </div>
                                    </form>
                                )
                            }}
                        />
                    </div>
                }

                {this.props.activeEntityCategory === 'furniture' && this.props.activeEntity &&
                    <div className="ins-props">
                        <div className="input-group">
                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    {img
                                        ? ( <img alt="" src={img.url} height={img.height} width={img.width}/> )
                                        : ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.props.activeEntity}
                            key={`formik__${this.props.activeEntity.attrs.id}`}
                            validate={values => {
                                let errors = {}
                                if (!values.attrs.id) {
                                    errors = set('attrs.id', 'Nimi on pakollinen', errors)
                                }
                                if (values.attrs.id && /\s/.test(values.attrs.id)) {
                                    errors = set('attrs.id', 'Nimessä ei saa olla välilyöntejä', errors)
                                }
                                if (!values.selectedRoom || !values.selectedRoom.attrs.id) {
                                    errors = set('selectedRoom', 'Huonekalulle valittava huone on pakollinen', errors)
                                }
                                if (values.isDoor && (!values.selectedDestination || !values.selectedDestination.attrs.id)) {
                                    errors = set('selectedDestination', 'Ovelle valittava huone on pakollinen', errors)
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateFurniture(this.props.activeEntityId, values)
                                    this.props.deleteExamineText(this.props.activeEntityId)
                                    this.props.deleteInteraction(this.props.activeEntityId)
                                    if (values.isDoor) {
                                        this.props.setDoorInteraction(this.props.activeEntityId, values.selectedDestination)
                                    } else if (values.isExaminable) {
                                        this.props.setExamineInteraction(this.props.activeEntityId, values.examineText)
                                    }
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label
                                        className="change-color-onhover"
                                        title="Syötä nimi huonekalulle">
                                        Nimi
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="name"
                                        name="attrs.id"
                                    />
                                    <ErrorMessage
                                        component="div"
                                        className="error-message"
                                        name="attrs.id"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="change-color-onhover" title="Valitse mihin huoneeseen huonekalu kuuluu">Huonekalun huone</label>
                                    {/* <Select styles={defaultSelectStyles}
                                            name="selectedRoom"
                                            value={formProps.selectedRoom}
                                            defaultValue={this.props.activeEntity.selectedRoom &&
                                                          this.props.activeEntity.selectedRoom.attrs &&
                                                          this.props.activeEntity.selectedRoom.attrs.id ?
                                                          this.props.activeEntity.selectedRoom : undefined}
                                            getOptionLabel={(option)=>option.attrs.id}
                                            options={this.props.rooms}
                                            noOptionsMessage={() => 'Ei tuloksia'}
                                            onChange={e => formProps.setFieldValue('selectedRoom', {'attrs': {'id':e.attrs.id}})}
                                            placeholder="Etsi huonetta..."/> */}
                                    <Field name="selectedRoom" type="text" component={SelectField}/>


                                    <ErrorMessage
                                        component="div"
                                        className="error-message"
                                        name="selectedRoom"
                                    />
                                </div>
                                <label
                                    className="change-color-onhover"
                                    title="Huonekalun sijainti huoneessa">
                                    Huonekalun sijainti
                                </label>
                                <div className="xy-container">
                                    <div className="col-6 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-981">
                                            X-arvo
                                        </label>
                                        <Field
                                            className="form-control col-6 xy-input xy-col"
                                            min="0"
                                            max="981"
                                            type="number"
                                            name="attrs.x"
                                        />
                                    </div>
                                    <div className="col-6 my-2 xy-col">
                                        <label className="col-6 change-color-onhover xy-col" title="Syötä arvo väliltä 0-583">
                                            Y-arvo
                                        </label>
                                        <Field
                                            className="form-control col-6 xy-input xy-col"
                                            min="0"
                                            max="583"
                                            type="number"
                                            name="attrs.y"
                                        />
                                    </div>
                                </div>
                                <div className="form-check my-3">
                                    <Field
                                        key={`${formProps.values.attrs.id}-visible`}
                                        type="checkbox"
                                        id="visibility-checkbox"
                                        className="form-check-input"
                                        checked={formProps.values.attrs.visible}
                                        name="attrs.visible"
                                    />
                                    <label
                                        className="form-check-label change-color-onhover"
                                        title="Valitse onko huonekalu näkyvissä"
                                        htmlFor="visibility-checkbox">
                                        Näkyvissä
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="change-color-onhover"
                                        title="Valitse interaktio huonekalulle">
                                        Interaktio
                                    </label>
                                    <div className="form-check my-3">
                                        <Field
                                            key={`${this.props.activeEntityId}-no-interaction`}
                                            type="radio"
                                            id="no-interaction-checkbox"
                                            className="form-check-input"
                                            checked={!formProps.values.isDoor && !formProps.values.isExaminable}
                                            onChange={e => {formProps.setFieldValue('isExaminable', false); formProps.setFieldValue('isDoor', false)}}
                                            name="noInteraction"
                                            value="noInteraction"
                                        />
                                        <label
                                            className="form-check-label change-color-onhover"
                                            title="Valitse onko huonekalu näkyvissä"
                                            htmlFor="no-interaction-checkbox">
                                            Ei interaktiota
                                        </label>
                                    </div>
                                    <div className="form-check my-3">
                                        <Field
                                            key={`${this.props.activeEntityId}-examinable`}
                                            type="radio"
                                            id="examinable-checkbox"
                                            className="form-check-input"
                                            checked={formProps.values.isExaminable === true}
                                            onChange={e => {formProps.setFieldValue('isExaminable', true); formProps.setFieldValue('isDoor', false)}}
                                            value="isExaminable"
                                            name="isExaminable"
                                        />
                                        <label
                                            className="form-check-label change-color-onhover"
                                            title="Valitse onko huonekalu tarkasteltavissa"
                                            htmlFor="examinable-checkbox">
                                            Tarkasteltavissa
                                        </label>
                                    </div>
                                    <textarea
                                        disabled={formProps.values.isExaminable === false}
                                        className="form-control"
                                        id="examinable-text"
                                        rows="2"
                                        value={formProps.values.examineText}
                                        onChange={e => formProps.setFieldValue('examineText', e.target.value)}>
                                    </textarea>
                                    <div className="form-check my-3">
                                        <Field
                                            key={`${this.props.activeEntityId}-door`}
                                            type="radio"
                                            id="door-checkbox"
                                            className="form-check-input"
                                            checked={formProps.values.isDoor === true}
                                            onChange={e => {formProps.setFieldValue('isExaminable', false); formProps.setFieldValue('isDoor', true)}}
                                            value="isDoor"
                                            name="isDoor"
                                        />
                                        <label
                                            className="form-check-label change-color-onhover"
                                            title="Valitse onko huonekalu näkyvissä"
                                            htmlFor="door-checkbox">
                                            Ovi
                                        </label>
                                    </div>
                                    <Select styles={defaultSelectStyles}
                                            name="selectedDestination"
                                            value={formProps.selectedDestination}
                                            isDisabled={!formProps.values.isDoor}
                                            defaultValue={this.props.activeEntity.selectedDestination &&
                                                          this.props.activeEntity.selectedDestination.attrs &&
                                                          this.props.activeEntity.selectedDestination.attrs.id ?
                                                          this.props.activeEntity.selectedDestination : undefined}
                                            getOptionLabel={(option)=>option.attrs.id}
                                            options={this.props.rooms}
                                            noOptionsMessage={() => 'Ei tuloksia'}
                                            onChange={e => formProps.setFieldValue('selectedDestination', {'attrs': {'id':e.attrs.id}})}
                                            placeholder="Etsi huonetta..."/>
                                    <ErrorMessage
                                        component="div"
                                        className="error-message"
                                        name="selectedDestination"
                                    />
                                </div>
                                <div className="item-edit-actions">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="ml-2"
                                        onClick={formProps.handleReset}
                                        disabled={!formProps.dirty}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
                    </div>
                }

                {this.props.activeEntityCategory === 'item' && this.props.activeEntity &&
                    <div className="ins-props">
                        <div className="input-group">
                            {this.props.activeEntity !== {} &&
                                <div className="input-img" onClick={this.openFileDialog}>
                                    <FileDialog onFileSelected={this.onFileSelected} fdRef={this.fileDialogRef}/>
                                    {img
                                        ? ( <img alt="" src={img.url} height={img.height} width={img.width}/> )
                                        : ( <span>Lisää kuva klikkaamalla</span> )
                                    }
                                </div>
                            }
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={this.props.activeEntity}
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
                                    this.props.updateItem(this.props.activeEntityId, values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <div className="form-group">
                                    <label
                                        className="change-color-onhover"
                                        title="Syötä nimi esinelle">
                                        Nimi
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="name"
                                        name="attrs.id"
                                    />
                                    <ErrorMessage
                                        component="div"
                                        className="error-message"
                                        name="attrs.id"
                                    />
                                </div>
                                <div className="form-check my-3">
                                    <Field
                                        key={`${formProps.values.attrs.id}-visible`}
                                        type="checkbox"
                                        id="visibility-checkbox"
                                        className="form-check-input"
                                        checked={formProps.values.attrs.visible}
                                        name="attrs.visible"
                                    />
                                    <label
                                        className="form-check-label change-color-onhover"
                                        title="Valitse onko esine näkyvissä"
                                        htmlFor="visibility-checkbox">
                                        Näkyvissä
                                    </label>
                                </div>
                                <div className="item-edit-actions">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="ml-2"
                                        onClick={formProps.handleReset}
                                        disabled={!formProps.dirty}>
                                        Peruuta
                                    </Button>
                                </div>
                            </form>
                            )}
                        />
                    </div>
                }
                {this.props.activeEntityCategory === 'interaction' && this.props.activeEntity &&
                    <div className="ins-props">
                        <span className="ins-props-header">Ominaisuudet</span>
                        <Formik
                            enableReinitialize
                            initialValues={{id: ''}}
                            validate={values => {
                                let errors = {}
                                if (!values.id) {
                                    errors = set('id', 'Nimi on pakollinen', errors)
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.updateItem(this.props.activeEntityId, values)
                                } catch (e) {
                                    actions.setFieldError('attrs.id', e.message)
                                }
                            }}
                            render={(formProps) => (
                            <form onSubmit={formProps.handleSubmit}>
                                <Select styles={defaultSelectStyles}
                                        value={formProps.id}
                                        defaultValue={{attrs: {id: this.props.activeEntity}}}
                                        getOptionLabel={(option)=>option.attrs.id}
                                        options={[...this.props.items, ...this.props.furnitures]}
                                        noOptionsMessage={() => 'Ei tuloksia'}
                                        onChange={e => formProps.setFieldValue('id', {'attrs': {'id':e.attrs.id}})}
                                        placeholder="Etsi lähdehuonekalua/esinettä..."/>
                                <div className="item-edit-actions">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={!formProps.dirty}>
                                        Tallenna
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="ml-2"
                                        onClick={formProps.handleReset}
                                        disabled={!formProps.dirty}>
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
    activeEntityCategory: getActiveEntityCategory(state),
    activeEntityId: getActiveEntityId(state),
    items: getItems(state)
})
const mapDispatchToProps = dispatch => ({
    setRoomBackgroundImage: (roomId, path, objectUrl) => dispatch(setRoomBackgroundImage(roomId, path, objectUrl)),
    setFurnitureImage: (furnitureId, path, objectUrl) => dispatch(setFurnitureImage(furnitureId, path, objectUrl)),
    setItemImage: (itemId, path, objectUrl) => dispatch(setItemImage(itemId, path, objectUrl)),
    updateRoom: (oldId, roomObject) => dispatch(updateRoom(oldId, roomObject)),
    updateFurniture: (oldId, furnitureObject) => dispatch(updateFurniture(oldId, furnitureObject)),
    updateItem: (oldId, itemObject) => dispatch(updateItem(oldId, itemObject)),
    setDoorInteraction: (furnitureId, selectedDestination) => dispatch(setDoorInteraction(furnitureId, selectedDestination)),
    setExamineInteraction: (furnitureId, examineText) => dispatch(setExamineInteraction(furnitureId, examineText)),
    deleteInteraction: (interactionId) => dispatch(deleteInteraction(interactionId)),
    deleteExamineText: (furnitureId) => dispatch(deleteExamineText(furnitureId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Inspector);
