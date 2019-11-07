import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { setActiveInteraction, addInteraction, deleteInteraction, getInteractions } from 'actions/interactions'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'
import { getFurnitures } from 'actions/furnitures'
import { getItems } from 'actions/items'
import { getRooms } from 'actions/rooms'

export class Interactions extends React.Component {

    isActiveInteraction(interaction) {
        if (this.props.activeInteraction && this.props.activeInteraction.attrs) {
            return this.props.activeInteraction.attrs.id === interaction.attrs.id;
        }
        return false;
    }

    render() {
        // this.props.interactions.map((item) => {
        //     console.log('1', item)
        //     console.log('2',item[Object.keys(item)])
        // })
        console.log('activeInteraction',this.props.activeInteraction)
        return (
            <div>
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addItem}
                        namePlaceholder={'Syötä interaktion nimi'}
                        submitLabel={'Lisää interaktio'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option.attrs.id}
                                options={this.props.items}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi interaktiota..."/>
                    </div>
                </div>
                <div className="listitem-container">
                    {this.props.items.length === 0 &&
                        <div className="empty-list-text">
                            Ei esineitä! Luo uusi esine tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    <table className="interactions-table">
                        <tbody>
                            <tr>
                                <th>Lähde</th>
                                <th>Kohde</th>
                                <th>Interaktio</th>
                            </tr>
                        </tbody>
                    </table>
                    {this.props.interactions.map((interaction,key) => {
                        return (
                            <table
                                className={'interactions-table listitem ' + (this.isActiveInteraction(interaction) ? 'active-listeitem': '')}
                                key={'table-'+key}
                                onClick={() => this.props.onClickInteraction(interaction)}
                            >
                                <tbody>
                                    {Object.keys(interaction) === 'click' &&
                                        <tr key={'tr-'+key}>
                                            <th key={'th-source-'+key}>{}</th>
                                            <th key={'th-dest-'+key}>{interaction[Object.keys(interaction)].destination}</th>
                                        </tr>
                                    }
                                    {Object.keys(interaction) !== 'click' &&
                                        <tr key={'tr-'+key}>
                                            <th key={'th-source-'+key}>{Object.keys(interaction)}</th>
                                            <th key={'th-dest-'+key}>{Object.keys(interaction)}</th>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                            // <div
                            //     className={'listitem ' + (this.isActiveItem(item) ? 'active-listitem' : '')}
                            //     key={item.attrs.id}
                            //     onClick={() => this.props.onClickItem(item)}
                            // >
                            //     <span className="listitem-name">
                            //         {item.attrs.id}
                            //     </span>
                            //     {this.isActiveItem(item) &&
                            //         <span className="trash" onClick={(e) => {
                            //             this.props.removeItem(item)
                            //             e.stopPropagation()
                            //         }}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                            //     }
                            // </div>
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
