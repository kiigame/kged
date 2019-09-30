import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'tab-list-item col side-nav-item';

        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <div className={className} onClick={onClick}>
                {label}
            </div>
        //   <div className="row side-nav">
        //         <div className="col side-nav-item">
        //             Huoneet
        //         </div>
        //         <div className="col side-nav-item">
        //             Esineet
        //         </div>
        //         <div className="col side-nav-item">
        //             Interaktiot
        //         </div>
        //     </div>
        //     <button className="btn mt-4" type="button">Lisää</button>
        //     <ul className="mt-4">
        //         <li>Huone 1</li>
        //         <li>Huone 2</li>
        //         <li>Huone 3</li>
        //     </ul>
        );
    }
}


export default Tab;
