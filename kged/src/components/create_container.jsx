import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, Field, ErrorMessage } from 'formik'
import Button from 'react-bootstrap/Button'
import 'styles/create_container.scss'

export class CreateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isActive: false }
	}

	setIsActive = (active) => (
		this.setState({ isActive: active })
	)

	render() {
		return (
		  	<div>
                {!this.state.isActive &&
                    <div className="container">
                        <div className="row">
                            <Button variant="success" className="my-2 mr-2 col create-new-btn" onClick={() => this.setIsActive(true)}>
                                <FontAwesomeIcon icon="plus"/>
                            </Button>
                            <input className="form-control col my-2 mr-2 searchbox" placeholder="Etsi..." type="name" name="name" />
                        </div>
                    </div>
                }
                {this.state.isActive &&
                    <div className="item-create-container">
                        <Formik
                            initialValues={{ name: '' }}
                            validate={values => {
                                let errors = {}
                                if (!values.name) {
                                    errors.name = 'Nimi on pakollinen'
                                }
                                if (values.name && /\s/.test(values.name)) {
                                    errors.name = 'Nimessä ei saa olla välilyöntejä'
                                }
                                return errors
                            }}
                            onSubmit={(values, actions) => {
                                try {
                                    this.props.addItem({ name: values.name.trim() })
                                    this.setIsActive(false)
                                } catch (e) {
                                    actions.setFieldError('name', e.message)
                                }
                            }}
                            render={(formProps) => (
                                <form onSubmit={formProps.handleSubmit}>
                                    <div className="form-group">
                                        <label>Nimi</label>
                                        <Field className="form-control" type="name" name="name" placeholder={this.props.namePlaceholder} />
                                        <ErrorMessage component="div" className="error-message" name="name" />
                                    </div>
                                    <div className="item-create-actions">
                                        <Button type="submit" variant="success" className="mr-2">
                                            <FontAwesomeIcon icon="plus" className="mr-2" />
                                            {this.props.submitLabel}
                                        </Button>
                                        <Button variant="secondary" onClick={() => this.setIsActive(false)}>
                                            Peruuta
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
				}
			</div>
		)
	}
}
export default CreateContainer;
