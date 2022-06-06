import React, { PureComponent } from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {
    DesktopOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import "./index.scss"
import { withTranslation } from 'react-i18next';

const { SubMenu } = Menu;

class Sidebar extends PureComponent {
    render() {
        const { t } = this.props;
        return (
            <div style={{ width: '100%'}} className="sidebar">
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.Item key="1">
                        <Link to="/">{t('sideBar.index')}</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/cluster">{t('sideBar.raft')}</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/rate">{t('sideBar.rate')}</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/acl">{t('sideBar.acl')}</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        Option 3
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu> */}
                </Menu>
            </div>
        );
    }
}
export default withTranslation()(Sidebar);