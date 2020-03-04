import React from 'react'
import { connect } from 'react-redux'
import { setGameName } from '../actions/global'
import '../styles/titlebar.scss'

export class TitleBar extends React.Component{
    constructor(props){
        super(props)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        event.preventDefault()
        this.props.setName(event.target.value)
    }

    render(){
        return(
            <div>
                <form>
                    <input className="game-name" type="text" onChange={this.onChangeHandler} placeholder={this.props.gameName} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    gameName: state.global.gameName
})

const mapDispatchToProps = dispatch => ({
    setName: name => dispatch(setGameName(name))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleBar);