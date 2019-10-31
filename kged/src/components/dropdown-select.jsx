import React from 'react';
import Select from 'react-select';

export class DropdownSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        }
    }

    handleChange = selectedOption => {
        this.setState({
            selectedOption
            }, () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const customStyles = {
            option: (provided, state) => ({
                backgroundColor: '#bdbdbd',
                color: '#212121',
                border: '1px solid #bdbdbd',
                '&:hover': {
                    backgroundColor: '#78909C',
                }
            }),
            menu: (provided, state) => ({
                marginTop: '2px',
                borderRadius: '5px',
                border: '2px solid #bdbdbd',
                backgroundColor: '#bdbdbd',
                marginBottom: '10px'
            }),
            container: (provided, state) => ({
                marginBottom: '1rem'
            })
        }
        return (
            <Select
                styles={customStyles}
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.content}
                getOptionLabel={(option)=>option.attrs.id}
                placeholder={this.props.placeholder}
            />
        );
    }
}

export default DropdownSelect;
