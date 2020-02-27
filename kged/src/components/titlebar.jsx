import React from 'react'
import { connect } from 'react-redux'
import { getGameName, setGameName } from '../actions/global'

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
                    <input type="text" onChange={this.onChangeHandler} placeholder="Anna pelille nimi..." />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    gameName: getGameName(state)
})

const mapDispatchToProps = dispatch => ({
    setName: name => dispatch(setGameName(name))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleBar);