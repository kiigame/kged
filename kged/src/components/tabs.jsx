import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SidebarActions from '../actions/sidebar_actions'
import SidebarStore from '../stores/sidebar_store'
import Tab from './tab';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label,
            activeView: SidebarStore.getActiveView()
        };
        this.updateActiveView = this.updateActiveView.bind(this);
    }

    componentDidMount() {
        SidebarStore.on("storeUpdated", this.updateActiveView);
    }

    componentWillUnmount() {
        SidebarStore.removeListener("storeUpdated", this.updateActiveView);
    }

    updateActiveView = () => {
        this.setState({
            activeView: SidebarStore.getActiveView()
        })
    }

    onClickTabItem = (tab) => {
        this.setState({
            activeTab: tab
        });
        SidebarActions.changeSidebarView(tab)
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
            <div className="tab-content">
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
