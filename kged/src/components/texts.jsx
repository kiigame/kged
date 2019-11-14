import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveText, setActiveText, addText, deleteText, getTexts } from 'actions/texts'
import CreateContainer from './create_container'
import 'styles/rooms.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Texts extends React.Component {

    isActiveText(text) {
        if (this.props.activeText) {
            return this.props.activeText === text
        }
    }

    render() {
        return (
            <div>
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addText}
                        namePlaceholder={'Syötä huoneen nimi'}
                        submitLabel={'Lisää huone'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={option => option}
                                options={this.props.texts}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi huonetta..."/>
                    </div>
                    {/* <input className="form-control col searchbox" placeholder="Etsi..." type="name" name="name" /> */}
                </div>
                <div className="listitem-container">
                    {this.props.texts.length === 0 &&
                        <div className="empty-list-text">
                            Ei tekstejä! Luo uusi teksti tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {this.props.texts.map((text) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveText(text) ? 'active-listitem' : '')}
                                key={text}
                                onClick={() => this.props.onClickText(text)}
                            >
                                <span className="listitem-name">
                                    {text}
                                </span>
                                {this.isActiveText(text) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeText(text)
                                        e.stopPropagation()
                                    }}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    texts: getTexts(state),
    activeText: getActiveText(state)
})

const mapDispatchToProps = dispatch => ({
    onClickText: text => dispatch(setActiveText(text)),
    addText: text => dispatch(addText(text)),
    removeText: text => dispatch(deleteText(text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Texts)
