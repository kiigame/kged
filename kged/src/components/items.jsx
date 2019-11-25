import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveItem, setActiveItem, addItem, deleteItem, getItems } from 'actions/items'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Items extends React.Component {

    isActiveItem(item) {
        if (this.props.activeItem && this.props.activeItem.attrs) {
            return this.props.activeItem.attrs.id === item.attrs.id;
        }
        return false;
    }

    render() {
        return (
            <div className="list-container">
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addItem}
                        namePlaceholder={'Syötä esineen nimi'}
                        submitLabel={'Lisää esine'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option.attrs.id}
                                options={this.props.items}
                                onChange={e => this.props.onClickItem(e)}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi esinettä..."/>
                    </div>
                </div>
                <div className="listitem-container">
                    {this.props.items.length === 0 &&
                        <div className="empty-list-text">
                            Ei esineitä! Luo uusi esine tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {this.props.items.map((item) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveItem(item) ? 'active-listitem' : '')}
                                key={item.attrs.id}
                                onClick={() => this.props.onClickItem(item)}
                            >
                                <span className="listitem-name">
                                    {item.attrs.id}
                                </span>
                                {this.isActiveItem(item) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeItem(item)
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
    activeItem: getActiveItem(state)
})

const mapDispatchToProps = dispatch => ({
    onClickItem: item => dispatch(setActiveItem(item.attrs.id)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(deleteItem(item)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Items);
