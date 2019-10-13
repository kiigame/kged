import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'styles/create_container.css';

class CreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.initialState,
            isActive: false
        }
    }

    setIsActive = (active) => (
        this.setState({ isActive: active })
    )

    handleSubmit = () => {
        this.props.addItem(this.state.item)
        this.setIsActive(false)
    }

    render() {
        return (
            <div>
                {!this.state.isActive &&
                <div>
                    <Button variant="success" className="my-3" onClick={() => this.setIsActive(true)}>
                        <FontAwesomeIcon icon="plus" className="mr-2"/>
                        Lisää
                    </Button>
                </div>
                }
                {this.state.isActive &&
                <div className="newItemContainer py-3">
                    <Form>
                        <Form.Label>Nimi</Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="name" required
                                          placeholder={this.props.namePlaceholder}
                                          onChange={(event) => this.setState({item: {name: event.target.value}})}
                            />
                        </Form.Group>
                        <div className="newItemButtonGroup">
                            <Button type="submit" variant="success" className="mr-2" onClick={() => { this.handleSubmit() }}>
                                <FontAwesomeIcon icon="plus" className="mr-2" />
                                {this.props.submitLabel}
                            </Button>
                            <Button variant="secondary" onClick={() => this.setIsActive(false)}>
                                Peruuta
                            </Button>
                        </div>
                    </Form>
                </div>
                }
            </div>
        );
    }
}

export default CreateContainer;
