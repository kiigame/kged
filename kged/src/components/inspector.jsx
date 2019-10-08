import React from 'react';
import { connect } from 'react-redux'
import 'styles/inspector.scss';

class Inspector extends React.Component {

    render() {
        const activeView = 'Huoneet';
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col">
                        Inspektori
                    </div>
                </div>
                {activeView === 'Huoneet' &&
                    <div className="ins-props">
                        <div className="input-group">
                            <div className="input-img">
                            </div>
                        </div>
                        <span className="ins-props-header">Ominaisuudet</span>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input type="text" defaultValue='32123312' disabled readOnly className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Nimi</span>
                            </div>
                            <input type="text" placeholder="Huoneen nimi" defaultValue='1212123' onChange={this.updateRoom} className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Leveys</span>
                            </div>
                            <input type="number" defaultValue="1280" className="form-control" />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Korkeus</span>
                            </div>
                            <input type="number" defaultValue="720" className="form-control" />
                        </div>
                    </div>
                }
                {activeView === 'Esineet' &&
                    <div>Esineet</div>
                }
                {activeView === 'Interaktiot' &&
                    <div>Interaktiot</div>
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    rooms: state.rooms
})
export default connect(mapStateToProps)(Inspector);
