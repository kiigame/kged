import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveFurniture, setActiveFurniture, addFurniture, deleteFurniture, getFurnitures } from 'actions/furnitures'
import CreateContainer from './create_container'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Furnitures extends React.Component {
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

    isActiveFurniture(furniture) {
        if (this.props.activeFurniture && this.props.activeFurniture.attrs) {
            return this.props.activeFurniture.attrs.id === furniture.attrs.id;
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
                <div className="listitem-container" style={listStyle}>
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
