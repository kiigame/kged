import React from 'react'
import { connect } from 'react-redux'

import { getActiveCharacter, setActiveCharacter, getCharacter } from 'actions/character'

export class Character extends React.Component {
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

    isActiveCharacter(character) {
        if (this.props.activeCharacter && this.props.activeCharacter.attrs) {
            return this.props.activeCharacter.attrs.id === character.attrs.id;
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
                <div className="listitem-container" style={listStyle}>
                    {this.props.character.map((character) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveCharacter(character) ? 'active-listitem' : '')}
                                key={character.attrs.id}
                                onClick={() => this.props.onClickCharacter(character)}
                            >
                                <span className="listitem-name">
                                    {character.attrs.id}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    character: getCharacter(state),
    activeCharacter: getActiveCharacter(state)
})

const mapDispatchToProps = dispatch => ({
    onClickCharacter: character => dispatch(setActiveCharacter(character.attrs.id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Character);
