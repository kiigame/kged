import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setActiveFurniture, addFurniture, deleteFurniture } from 'actions/furnitures';
import CreateContainer from './create_container'
import DropdownSelect from './dropdown-select'

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
                        <DropdownSelect content={this.props.furnitures} placeholder="Etsi huonekalua..."/>
                    </div>
                </div>
                <div className="listitem-container">
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
                                    <span className="trash" onClick={() => this.props.removeFurniture(furniture)}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
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
    furnitures: state.furnitures.furnitures,
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
