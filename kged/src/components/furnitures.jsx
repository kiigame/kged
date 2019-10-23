import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setActiveFurniture, addFurniture, deleteFurniture } from 'actions/furnitures';
import CreateContainer from './create_container'

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
                <CreateContainer
                    initialState={{name: ''}}
                    addItem={this.props.addFurniture}
                    namePlaceholder={'Syötä esineen nimi'}
                    submitLabel={'Lisää esine'}
                />
                {this.props.furnitures.map((furniture) => {
                    return (
                        <div
                            id={'furnitures-'+furniture.attrs.id}
                            className="furniture-name"
                            style={{
                                background: this.isActiveFurniture(furniture) ?
                                    '#616161' :
                                    '#333333'
                            }}
                            key={'furnitures-'+furniture.attrs.id}
                            onClick={() => this.props.onClickFurniture(furniture)}
                        >
                            {furniture.attrs.id}
                            {this.isActiveFurniture(furniture) &&
                                <span className="trash" onClick={() => this.props.removeFurniture(furniture)}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                            }
                        </div>
                    )
                })}
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
