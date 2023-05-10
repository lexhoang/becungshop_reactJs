import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
// import Element from 'antd/es/skeleton/Element';
const { Header, Sider, Content } = Layout;

const styleNavLink = ({ isActive }) => ({
    textDecoration: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "2px 16px",
    fontSize: "12px",
    fontWeight: isActive ? "bold" : "",

});

export default function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: '1',
                            icon: <VideoCameraOutlined />,
                            label: <NavLink to="" style={styleNavLink}>Dành cho</NavLink>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: <NavLink to="typemanager" style={styleNavLink}>Loại sản phẩm</NavLink>,
                        }
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        style: {
                            padding: "0 24px",
                            fontSize: "28px",
                            lineHeight: "64px",
                            cursor: "pointer",
                            transition: "color 0.3s"
                        },
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}