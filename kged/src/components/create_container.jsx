import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, Field, ErrorMessage } from 'formik'
import Button from 'react-bootstrap/Button'
import 'styles/create_container.scss'
import { DuplicateEntityError } from 'utils/errors'

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
                <Button variant="success"
                        className="m-2 col create-new-btn"
                        onClick={() => this.setIsActive(true)}
                        disabled={this.state.isActive}>
                    <FontAwesomeIcon icon="plus"/>
                </Button>
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
                                    if (e instanceof DuplicateEntityError) {
                                        actions.setFieldError('name', e.message)
                                    }
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
                                        <Button type="submit" variant="success">
                                            <FontAwesomeIcon icon="plus" className="mr-2" />
                                            {this.props.submitLabel}
                                        </Button>
                                        <Button variant="secondary" className="ml-2" onClick={() => this.setIsActive(false)}>
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
