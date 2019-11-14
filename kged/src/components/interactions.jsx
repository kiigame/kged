import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { setActiveInteraction, addInteraction, deleteInteraction, getInteractions } from 'actions/interactions'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'
import { getFurnitures } from 'actions/furnitures'
import { getItems } from 'actions/items'
import { getRooms } from 'actions/rooms'

export class Interactions extends React.Component {

    isActiveInteraction(interaction) {
        if (this.props.activeInteraction === interaction) {
            return this.props.activeInteraction;
        }
        return false;
    }

    render() {
        // this.props.interactions.map((item) => {
        //     console.log('1', item)
        //     console.log('2',item[Object.keys(item)])
        // })
        // this.props.interactions.map((interaction,key) => {
        //     console.log('interaction',interaction)
        //     console.log('key',key)
        // })
        console.log(this.props.interactions)
        return (
            <div>
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addInteraction}
                        namePlaceholder={'Syötä interaktion nimi'}
                        submitLabel={'Lisää interaktio'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option}
                                options={Object.keys(this.props.interactions)}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi interaktiota..."/>
                    </div>
                </div>
                <div className="listitem-container">
                    {this.props.interactions.length === 0 &&
                        <div className="empty-list-text">
                            Ei interaktioita! Luo uusi interaktio tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {Object.keys(this.props.interactions).map((interaction) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveInteraction(interaction) ? 'active-listitem' : '')}
                                key={interaction}
                                onClick={() => this.props.onClickInteraction(interaction)}
                            >
                                <span className="listitem-name">
                                    {interaction}
                                </span>
                                {this.isActiveInteraction(interaction) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeInteraction(interaction)
                                        e.stopPropagation()
                                    }}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                                }
                            </div>
                        )
                    })}
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
    activeInteraction: state.interactions.activeInteraction
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
