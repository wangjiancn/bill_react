import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import 'antd/dist/antd.css';
import { NavLink } from "react-router-dom";

const { Header } = Layout

class Nav extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    };

    render() {
        const { location } = this.props;
        return (
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: "64px" }}
                        defaultSelectedKeys={["/"]}
                        selectedKeys={[location.pathname]}
                    >
                        <Menu.Item key="/">
                            <NavLink to="/">首页</NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="/line">
                            <NavLink to="/line">流水线</NavLink>
                        </Menu.Item> */}
                        <Menu.Item key="/chart">
                            <NavLink to="/chart">图表</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
}

export default Nav;

