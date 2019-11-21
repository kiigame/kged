import React from 'react'
import { connect } from 'react-redux'
import { KiiGame } from '@kiigame/adventure_engine'
import { JSONGetter } from 'utils/json_getter'
import 'styles/preview.scss';

export class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            engine: undefined,
            initialized: false
        }
    }

    componentDidMount() {
        this.setState({
            engine: new KiiGame(new JSONGetter())
        })
    }

    render() {
        return (
            <div className="row pre-content">
                <div id="container" className="col pre-screen"></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

export default connect(
    mapStateToProps,
)(Preview);
