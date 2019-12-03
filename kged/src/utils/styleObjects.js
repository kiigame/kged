export const defaultSelectStyles = {
    // default styles for react-select
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
        marginBottom: '1rem',
    }),
    control: (provided, state) => ({
        ...provided,
        opacity: state.isDisabled ? '0.5' : '1'
    })
}
