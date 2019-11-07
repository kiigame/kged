import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveFurniture, setActiveFurniture, addFurniture, deleteFurniture, getFurnitures } from 'actions/furnitures'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Furnitures extends React.Component {

    isActiveFurniture(furniture) {
        if (this.props.activeFurniture && this.props.activeFurniture.attrs) {
            return this.props.activeFurniture.attrs.id === furniture.attrs.id;
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addFurniture}
                        namePlaceholder={'Syötä huonekalun nimi'}
                        submitLabel={'Lisää huonekalu'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option.attrs.id}
                                options={this.props.furnitures}
                                onChange={e => this.props.onClickFurniture(e)}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi huonekalua..."/>
                    </div>
                </div>
                <div className="listitem-container">
                    {this.props.furnitures.length === 0 &&
                        <div className="empty-list-text">
                            Ei huonekaluja! Luo uusi huonekalu tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {this.props.furnitures.map((furniture) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveFurniture(furniture) ? 'active-listitem' : '')}
                                key={furniture.attrs.id}
                                onClick={() => this.props.onClickFurniture(furniture)}
                            >
                                <span className="listitem-name">
                                    {furniture.attrs.id}
                                </span>
                                {this.isActiveFurniture(furniture) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeFurniture(furniture)
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
    furnitures: getFurnitures(state),
    activeFurniture: getActiveFurniture(state)
})

const mapDispatchToProps = dispatch => ({
    onClickFurniture: furniture => dispatch(setActiveFurniture(furniture.attrs.id)),
    addFurniture: furniture => dispatch(addFurniture(furniture)),
    removeFurniture: furniture => dispatch(deleteFurniture(furniture)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Furnitures);
