import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

export class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
        <div>
            <div className="row side-nav">
            {children.map((child,i) => {
                const { label } = child.props;
                return (
                    <Tab
                        activeTab={activeTab}
                        key={i}
                        label={label}
                        onClick={onClickTabItem}
                    />
                );
            })}
            </div>
            <div className="tab-content my-3">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
        );
    }
}

export default Tabs;
