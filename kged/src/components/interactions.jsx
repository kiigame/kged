import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { Formik, Field, ErrorMessage } from 'formik'
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { set } from 'lodash/fp'
import { setActiveInteraction, addInteraction, deleteInteraction, getInteractions } from 'actions/interactions'
import { getFurnitures } from 'actions/furnitures'
import { getItems } from 'actions/items'
import { getRooms } from 'actions/rooms'
import { getActiveEntity, getActiveEntityId } from 'actions/entity'
import 'styles/interactions.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

const interactionTypeOptions = [
    { value: "monologue", label:"Puhe", hasText:true, hasTargetObject:false},
    { value: "inventory_add", label:"Esineen lisäys", hasText:false, hasTargetObject:true},
    { value: "inventory_remove", label:"Esineen poisto", hasText:false, hasTargetObject:true},
    { value: "add_object", label:"Huonekalun lisäys", hasText:false, hasTargetObject:true},
    { value: "remove_object", label:"Huonekalun poisto", hasText:false, hasTargetObject:true},
    //{ value: "play_ending", label:"Pelin loppu", hasText:false, hasTargetObject:false},
    //{ value: "do_transition", label:"Huoneen vaihto", hasText:false, hasTargetObject:false},
    //{ value: "play_character_animation", label:"Hahmo-animaation toisto", hasText:false, hasTargetObject:false},
    //{ value: "play_sequence", label:"Sekvenssin toisto", hasText:false, hasTargetObject:false},
    //{ value: "set_idle_animation", label:"Idle-animaation vaihto", hasText:false, hasTargetObject:false},
    //{ value: "set_speak_animation", label:"Puhe-animaation vaihto", hasText:false, hasTargetObject:false},
    { value: "npc_monologue", label:"Huonekalun puhe", hasText:true, hasTargetObject:false}
];

export class Interactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: '100%', overflow: 'auto' };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        var windowHeight = window.innerHeight;
        var listHeight = document.getElementsByClassName('listitem-container')[0].clientHeight

        if (listHeight > windowHeight) {
            this.setState({ height: windowHeight-200 });
        }
    }

    setActiveToggle = (toggleOption) => {
        this.setState({ toggleOption })
    }

    setIsActive = (active) => (
		this.setState({ isActive: active })
	)

    isActiveInteraction(object) {
        if (this.props.activeInteraction === object) {
            return this.props.activeInteraction;
        }
        return false;
    }

    render() {
        var listStyle = {
            height: this.state.height,
            overflow: 'auto'
        }
        
        return (

            <div className="list-container">
                <div className="interaction-container">
                    <div className="togglebutton-container">
                        <ToggleButtonGroup type="radio" name="typeToggle" onChange={this.setActiveToggle}>
                            <ToggleButton value={1} variant="secondary">Esine</ToggleButton>
                            <ToggleButton value={2} variant="secondary">Huonekalu</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    {this.state.toggleOption === 1 &&       
                        <div className="action-header-container">
                            <div className="interaction-searchbox-container">
                                <Select styles={defaultSelectStyles}
                                        getOptionLabel={(option)=>option.attrs.id}
                                        options={this.props.items}
                                        onChange={e => this.props.onClickInteraction(e)}
                                        noOptionsMessage={() => 'Ei tuloksia'}
                                        placeholder="Valitse Esine..."/>
                            </div>
                        </div>
                    }

                    {this.state.toggleOption === 2 &&
                        <div className="action-header-container">
                            <div className="interaction-searchbox-container">
                                <Select styles={defaultSelectStyles}
                                        getOptionLabel={(option)=>option.attrs.id}
                                        options={this.props.furnitures}
                                        onChange={e => this.props.onClickInteraction(e)}
                                        noOptionsMessage={() => 'Ei tuloksia'}
                                        placeholder="Valitse Huonekalu..."/>
                            </div>
                        </div>
                    }

                    <div className="listitem-container" style={listStyle}>
                        {[...this.props.items, ...this.props.furnitures].length === 0 &&
                            <div className="empty-list-text">
                                Ei interaktioita! Käytä toimintapalkin Lataa-painiketta lataaksesi aiemmin luomasi materiaalit järjestelmään.
                            </div>
                        }

                        <div className="interaction-container">
                            {[...this.props.items, ...this.props.furnitures].length !== 0 &&
                                <div className="create-interaction-button">
                                    <Button 
                                        variant="success"
                                        onClick={() => this.setIsActive(true)}
                                        disabled={[...this.props.items, ...this.props.furnitures].length === 0}>
                                    <FontAwesomeIcon icon="plus"/>
                                    Lisää tapahtuma
                                    </Button>
                                </div>
                            }

                            {this.state.isActive &&
                                <div className="interaction-creator">
                                    <Formik
                                    enableReinitialize
                                    initialValues={this.props.activeEntity}
                                    validate={values => {
                                        let errors = {}
                                        if (values.interactionType === "inventory_add" && (!values.selectedItem || !values.selectedItem.attrs.id)) {
                                            errors = set('selectedItem', 'Tavaratilaan valittava esine on pakollinen', errors)
                                        }
                                        if (values.interactionType === "inventory_remove" && (!values.selectedItem || !values.selectedItem.attrs.id)) {
                                            errors = set('selectedItem', 'Tavaratilasta poistettava esine on pakollinen', errors)
                                        }
                                        if (values.interactionType === "add_object" && (!values.selectedObject || !values.selectedObject.attrs.id)) {
                                            errors = set('selectedObject', 'Lisättävä huonekalu on pakollinen', errors)
                                        }
                                        if (values.interactionType === "remove_object" && (!values.selectedObject || !values.selectedObject.attrs.id)) {
                                            errors = set('selectedObject', 'Poistettava huonekalu on pakollinen', errors)
                                        }
                                        if (values.interactionType === "play_ending" && !values.selectedSequence) {
                                            errors = set('selectedSequence', 'Toistettava lopetus on valittava', errors)
                                        }
                                        if (values.interactionType === "do_transition" && (!values.selectedDestination || !values.selectedDestination.attrs.id)) {
                                            errors = set('selectedDestination', 'Ovelle valittava huone on pakollinen', errors)
                                        }
                                        if (values.interactionType === "play_character_animation" && (!values.selectedAnimation || !values.selectedAnimation.attrs.id)) {
                                            errors = set('selectedAnimation', 'Toistettava hahmoanimaatio on valittava', errors)
                                        }
                                        if (values.interactionType === "play_sequence" && !values.selectedSequence) {
                                            errors = set('selectedSequence', 'Toistettava sekvenssi on valittava', errors)
                                        }
                                        if (values.interactionType === "set_idle_animation" && (!values.selectedAnimation || !values.selectedAnimation.attrs.id)) {
                                            errors = set('selectedAnimation', 'Asetettava animaatio on valittava', errors)
                                        }
                                        if (values.interactionType === "set_speak_animation" && (!values.selectedAnimation || !values.selectedAnimation.attrs.id)) {
                                            errors = set('selectedAnimation', 'Asetettava animaatio on valittava', errors)
                                        }
                                        return errors
                                    }}
                                    onSubmit={(values, actions) => {
                                        try {
                                            if (this.state.interactionTypeOption === "monologue") {
                                                this.props.setExamineInteraction(this.props.activeEntityId, values.examineText)
                                            } else if (this.state.interactionTypeOption === "inventory_add") {
                                                this.props.setInventory_addInteraction(this.props.activeEntityId, values.selectedItem)
                                            } else if (this.state.interactionTypeOption === "inventory_remove") {
                                                this.props.setInventory_removeInteraction(this.props.activeEntityId, values.selectedItem)
                                            } else if (this.state.interactionTypeOption === "add_object") {
                                                this.props.setAdd_objectInteraction(this.props.activeEntityId, values.selectedObject)
                                            } else if (this.state.interactionTypeOption === "remove_object") {
                                                this.props.setRemove_objectInteraction(this.props.activeEntityId, values.selectedObject)
                                            } else if (this.state.interactionTypeOption === "play_ending") {
                                                this.props.setPlay_EndingInteraction(this.props.activeEntityId, values.selectedSequence)
                                            } else if (this.state.interactionTypeOption === "do_transition") {
                                                this.props.setDoorInteraction(this.props.activeEntityId, values.selectedDestination)
                                            } else if (this.state.interactionTypeOption === "play_character_animation") {
                                                this.props.setPlay_Character_animationInteraction(this.props.activeEntityId, values.selectedAnimation)
                                            } else if (this.state.interactionTypeOption === "play_sequence") {
                                                this.props.setPlay_SequenceInteraction(this.props.activeEntityId, values.selectedSequence)
                                            } else if (this.state.interactionTypeOption === "set_idle_animation") {
                                                this.props.setSet_idle_AnimationInteraction(this.props.activeEntityId, values.selectedAnimation)
                                            } else if (this.state.interactionTypeOption === "set_speak_animation") {
                                                this.props.setSet_Speak_animationInteraction(this.props.activeEntityId, values.selectedAnimation)
                                            } else if (this.state.interactionTypeOption === "npc_monologue") {
                                                this.props.setNpc_MonologueInteraction(this.props.activeEntityId, values.examineText)
                                            }
                                            //this.props.updateInteraction(this.props.activeEntityId, values)
                                        } catch (e) {
                                            actions.setFieldError('attrs.id', e.message)
                                        }
                                    }}
                                    render={(formProps) => (
                                        <form onSubmit={formProps.handleSubmit}>
                                            
                                            <div className="form-group furniture-interactions">
                                                <label
                                                    className="change-color-onhover"
                                                    title="Valitse interaktio huonekalulle">
                                                    Valitse interaktio:
                                                </label>
                                                <div className="form-check my-3">
                                                    <Field
                                                        key={`${this.props.activeEntityId}-clickable`}
                                                        type="radio"
                                                        id="clickable-checkbox"
                                                        className="form-check-input"
                                                        checked={formProps.values.isClickable === true}
                                                        onChange={e => {formProps.setFieldValue('isClickable', true); formProps.setFieldValue('isDraggable', false)}}
                                                        name="click-interaction"
                                                        value="click-interaction"
                                                    />
                                                    <label
                                                        className="form-check-label change-color-onhover"
                                                        title="Valitse onko interaktio klikkaus-tyyppinen"
                                                        htmlFor="clickable-checkbox">
                                                        Klikkaus
                                                    </label>
                                                </div>
                                                <div className="form-check my-3">
                                                    <Field
                                                        key={`${this.props.activeEntityId}-draggable`}
                                                        type="radio"
                                                        id="draggable-checkbox"
                                                        className="form-check-input"
                                                        checked={formProps.values.isDraggable === true}
                                                        onChange={e => {formProps.setFieldValue('isClickable', false); formProps.setFieldValue('isDraggable', true)}}
                                                        name="drag-interaction"
                                                        value="drag-interaction"
                                                    />
                                                    <label
                                                        className="form-check-label change-color-onhover"
                                                        title="Valitse onko interaktio raahaus-tyyppinen"
                                                        htmlFor="draggable-checkbox">
                                                        Raahaus esineen/huonekalun päälle
                                                    </label>
                                                </div>
                                            </div>

                                        <div className="form-group furniture-room-selector">
                                            <label className="change-color-onhover" title="Valitse minkä tapahtuman tulisi tapahtua">Valitse tapahtuma:</label>
                                                <div className="action-header-container">
                                                    <div className="interaction-searchbox">
                                                        <Select styles={defaultSelectStyles}
                                                            name="selectedInteraction"
                                                            type="text"
                                                            options={interactionTypeOptions}
                                                            noOptionsMessage={() => 'Ei tuloksia'}
                                                            placeholder="Valitse tapahtuma..."
                                                            onChange={e => {formProps.setFieldValue('interactionType', e.value); formProps.setFieldValue('hasText', e.hasText); formProps.setFieldValue('hasTargetObject', e.hasTargetObject)}}
                                                        >

                                                        <ErrorMessage
                                                            component="div"
                                                            className="error-message"
                                                            name="selectedInteraction"
                                                        />
                                                        </Select>
                                                    </div>
                                                </div>
                                        </div>

                                            <label className="change-color-onhover" title="Kirjoita interaktion puheteksti tähän">Teksti:</label>
                                                <textarea
                                                    className="form-control"
                                                    id="interaction-text"
                                                    placeholder="Kirjoita puheteksti tähän..."
                                                    rows="2"
                                                    disabled={formProps.values.hasText === false}
                                                    value={formProps.values.examineText}
                                                    onChange={e => formProps.setFieldValue('examineText', e.target.value)}>
                                                </textarea>

                                            <label className="change-color-onhover" title="Valitse interaktion kohde">Valitse interaktion kohde:</label>
                                            <div className="action-header-container">
                                                <div className="interaction-searchbox">
                                                    <Select styles={defaultSelectStyles}
                                                        name="selectedObject"
                                                        type="text"
                                                        options={[...this.props.items, ...this.props.furnitures]}
                                                        getOptionLabel={(option)=>option.attrs.id}
                                                        noOptionsMessage={() => 'Ei tuloksia'}
                                                        placeholder="Valitse interaktion kohde..."
                                                        isDisabled={formProps.values.hasTargetObject === false}
                                                        onChange={e => (formProps.setFieldValue('selectedObject', e.id))}
                                                    >

                                                    <ErrorMessage
                                                        component="div"
                                                        className="error-message"
                                                        name="selectedObject"
                                                    />
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="item-edit-actions">
                                                <Button
                                                    type="submit"
                                                    variant="success"
                                                    onClick={e => {this.props.addInteraction(e); this.setIsActive(false);}}
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
                    </div>
                </div>
            </div>
        );
    
    }
}

const mapStateToProps = state => ({
    items: getItems(state),
    furnitures: getFurnitures(state),
    rooms: getRooms(state),
    interactions: getInteractions(state),
    //activeInteraction: getActiveInteraction(state),
    activeEntity: getActiveEntity(state),
    activeEntityId: getActiveEntityId(state)
})

const mapDispatchToProps = dispatch => ({
    onClickInteraction: event => dispatch(setActiveInteraction(event)),
    addInteraction: event => dispatch(addInteraction(event)),
    removeInteraction: event => dispatch(deleteInteraction(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Interactions);
