import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { setActiveItem, addItem, deleteItem } from 'actions/items'
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
            <div>
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
                                placeholder="Etsi esinettä..."/>
                    </div>
                </div>
                <div className="listitem-container">
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
                                    <span className="trash" onClick={() => this.props.removeItem(item)}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
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
    items: state.items.items,
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
)(Items);
