import React from 'react';
import { connect } from 'react-redux'
import 'styles/inspector.scss';

class Inspector extends React.Component {

    getActiveEntity() {
        if (this.props.entity && this.props.entity.activeEntity &&
            this.props.entity.activeEntity.attrs && this.props.entity.activeEntity.attrs.id) {
            return this.props.entity.activeEntity.attrs.id;
        }
    }

    getActiveView() {
        if (this.props.entity && this.props.entity.activeEntity &&
            this.props.entity.activeEntity.attrs && this.props.entity.activeEntity.attrs.category) {
            return this.props.entity.activeEntity.attrs.category;
        }
    }

    render() {
        return (
            <div className="col-md-6 col-lg-3 order-lg-last ins-container">
                <div className="row">
                    <div className="col">
                        Inspektori
                    </div>
                </div>
                {this.getActiveView() === 'room' &&
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
                            <input type="text" value={this.getActiveEntity()} disabled readOnly className="form-control" />
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
                {this.getActiveView() === 'item' &&
                    <div>Esineet</div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    rooms: state.rooms,
    entity: state.entity
})
export default connect(mapStateToProps)(Inspector);
