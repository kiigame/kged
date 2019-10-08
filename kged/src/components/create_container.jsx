import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'styles/create_container.css';

class CreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {name: ''},
            isActive: false
        }
    }
    changeIsActiveState = (val) => (
        this.setState({
            isActive: val
        })
    )
    render() {
        return (
            <div>
                {this.state.isActive === false &&
                    <Button variant="success" className="my-3" onClick={() => this.changeIsActiveState(true)}>
                        <FontAwesomeIcon icon="plus" className="mr-2"/>
                        Lisää
                    </Button>
                }
                {this.state.isActive === true &&
                    <div className="py-3">
                        {this.props.category === 'Huoneet' &&
                            <div>
                                <Form>
                                    <Form.Label>Nimi</Form.Label>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="name" placeholder="Syötä huoneen nimi" onChange={(event) => this.setState({room: {name: event.target.value}})} />
                                    </Form.Group>
                                    <div className="newItemButtonGroup">
                                        <Button variant="success" className="mr-2" onClick={() => this.props.addRoom(this.state.room)}>
                                            <FontAwesomeIcon icon="plus" className="mr-2" />
                                            Lisää huone
                                        </Button>
                                        <Button variant="secondary" onClick={() => this.changeIsActiveState(false)}>
                                            Peruuta
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        }
                        {this.props.category === 'Esineet' &&
                            <div>
                                <Form>
                                    <Form.Label>Nimi</Form.Label>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="name" placeholder="Syötä esineen nimi" onChange={(event) => this.setState({furniture: {name: event.target.value}})} />
                                    </Form.Group>
                                    <div className="newItemButtonGroup">
                                        <Button variant="success" className="mr-2" onClick={() => this.props.addFurniture(this.state.furniture)}>
                                            <FontAwesomeIcon icon="plus" className="mr-2" />
                                            Lisää esine
                                        </Button>
                                        <Button variant="secondary" onClick={() => this.changeIsActiveState(false)}>
                                            Peruuta
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        }
                        {this.props.category === 'Interaktiot' &&
                            <div>
                                <Form>
                                    <Form.Label>Nimi</Form.Label>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="name" placeholder="Syötä interaktion nimi" onChange={(event) => this.setState({room: {name: event.target.value}})} />
                                    </Form.Group>
                                    <div className="newItemButtonGroup">
                                        <Button variant="success" className="mr-2" onClick={() => this.props.addRoom(this.state.room)}>
                                            <FontAwesomeIcon icon="plus" className="mr-2" />
                                            Lisää interaktio
                                        </Button>
                                        <Button variant="secondary" onClick={() => this.changeIsActiveState(false)}>
                                            Peruuta
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        }
                    </div>
                }

            </div>
        );
    }
}

export default CreateContainer;
