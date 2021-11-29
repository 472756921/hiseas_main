import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { menus } from '../config/menu';
import { Link } from 'react-router-dom';
import { DeepClone } from '@/utils';
import Styles from './index.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Menus extends Component {
    state = {
        collapsed: false,
        mid: '1',
        menu: [],
    };

    onCollapse = (collapsed: boolean): null => {
        this.setState({ collapsed });
    };

    createMenus = (menusData) => {
        const pathName = this.props.location.pathname;
        menusData = JSON.parse(JSON.stringify(menusData));

        let defMid = '';
        const menus = menusData.map((it) => {
            it?.path === pathName ? (defMid = it.id) : '';

            if (it?.children) {
                return (
                    <SubMenu
                        key={it.id}
                        title={
                            <span>
                                <Icon type={it.icon} />
                                <span>{it.title}</span>
                            </span>
                        }
                    >
                        {this.createMenus(it.children)}
                    </SubMenu>
                );
            }
            if (it?.show) {
                return (
                    <Menu.Item key={it.id}>
                        <Link to={it.path}>
                            <Icon type={it.icon} />
                            <span>{it.title}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
        this.setState({ mid: defMid });
        return menus;
    };

    componentWillMount() {
        const { ruleList, permissions } = this.props;
        const Um = DeepClone(menus);
        if (permissions === 'admin') {
            this.setState({
                menu: this.createMenus(Um),
            });
            return false;
        }
        const rmenus = ruleList.map((it) => {
            const tm = Um.find((ij) => ij.path === `/${it.permissions}`);
            if (!it?.pathList.length) {
                tm.children = null;
                return tm;
            }
            if (tm?.children.length) {
                tm.children.map((ij, index) => {
                    if (it.pathList.find((im) => im.indexOf(ij.path) === -1)) {
                        tm.children.splice(index, 1);
                    }
                });
            }
            return tm;
        });
        this.setState({
            menu: this.createMenus(rmenus),
        });
    }
    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className={Styles.logo}></div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[this.state.mid]}
                    defaultOpenKeys={[this.state.mid.split('-')[0]]}
                    mode="inline"
                >
                    {this.state.menu}
                </Menu>
            </Sider>
        );
    }
}
