import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { setActiveFurniture, addFurniture, deleteFurniture, getFurnitures } from 'actions/furnitures'
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
        console.log('furnitures',this.props.furnitures)
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
    activeFurniture: state.furnitures.activeFurniture
})

const mapDispatchToProps = dispatch => ({
    onClickFurniture: event => dispatch(setActiveFurniture(event)),
    addFurniture: event => dispatch(addFurniture(event)),
    removeFurniture: event => dispatch(deleteFurniture(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Furnitures);
