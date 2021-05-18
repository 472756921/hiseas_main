import { Component } from 'react';
import { Layout, Row, Col, Menu, Dropdown, Icon, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { name } from '../config/system';
import Styles from './index.css';
import { history } from 'umi';
const { Header } = Layout;

export default class Head extends Component {
    loginOut = () => {
        sessionStorage.clear();
        history.push('/login');
    };
    render() {
        const permissions = JSON.parse(sessionStorage.getItem('userInfo'));
        const menu = (
            <Menu>
                <Menu.Item>
                    <span rel="noopener noreferrer" onClick={this.loginOut}>
                        注销
                    </span>
                </Menu.Item>
                {/* <Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
						修改密码
					</a>
				</Menu.Item> */}
            </Menu>
        );
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row>
                    <Col xxl={22} xl={21}>
                        <div className={Styles.title}>{name}</div>
                    </Col>
                    <Col xxl={2} xl={3}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <Avatar src={permissions.head}>
                                    {permissions.userName}
                                </Avatar>{' '}
                                操作 <DownOutlined />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        );
    }
}
