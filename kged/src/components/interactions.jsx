import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { setActiveItem, addItem, deleteItem, getItems } from 'actions/items'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'
import { getFurnitures } from 'actions/furnitures'
import { getInteractions } from 'actions/interactions'
import { getRooms } from 'actions/rooms'

export class Interactions extends React.Component {

    isActiveItem(item) {
        if (this.props.activeItem && this.props.activeItem.attrs) {
            return this.props.activeItem.attrs.id === item.attrs.id;
        }
        return false;
    }

    render() {
        // this.props.interactions.map((item) => {
        //     console.log('1', item)
        //     console.log('2',item[Object.keys(item)])
        // })
        console.log('interactions',this.props.interactions)
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
                            <table className="interactions-table" key={'table-'+key}>
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
    activeItem: state.items.activeItem
})

const mapDispatchToProps = dispatch => ({
    onClickItem: event => dispatch(setActiveItem(event)),
    addItem: event => dispatch(addItem(event)),
    removeItem: event => dispatch(deleteItem(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Interactions);
