import { Component, createRef } from 'react';
import {
    Layout,
    Row,
    Col,
    Menu,
    Dropdown,
    Avatar,
    Badge,
    Modal,
    Form,
    Input,
    message,
    Table,
} from 'antd';
import { CaretDownOutlined, BellOutlined } from '@ant-design/icons';
import Styles from './index.less';
import { history, connect } from 'umi';
const { Header } = Layout;

class Head extends Component {
    formRef = createRef();
    formRef2 = createRef();
    state = {
        menuList: [],
        passWord: false,
        userInfo: false,
        userInfoData: {},
    };

    loginOut = () => {
        this.props.dispatch({
            type: 'app/clearpermissions',
            payload: '',
            cb: () => {
                sessionStorage.clear();
                history.push('/login');
            },
        });
    };
    changePwd = () => {
        this.formRef.current.validateFields().then((value) => {
            this.props.dispatch({
                type: 'app/changePwd',
                payload: value,
                cb: () => {
                    message.success('修改成功');
                    this.setState({ passWord: false });
                    this.formRef.current.resetFields();
                    this.loginOut();
                },
            });
        });
    };
    setuserInfo = () => {
        this.formRef2.current.validateFields().then((value) => {
            this.props.dispatch({
                type: 'app/updateUserInfo',
                payload: value,
                cb: (data) => {
                    message.success('修改成功');
                    this.setState({ userInfo: false });
                    this.formRef2.current.resetFields();
                },
            });
        });
    };
    render() {
        const { userInfoData } = this.state;
        const columns = [
            {
                title: '公司/部门',
                dataIndex: 'organizationNames',
                key: 'organizationNames',
            },
            {
                title: '岗位',
                dataIndex: 'positionName',
                key: 'positionName',
            },
            {
                title: '部门负责人',
                dataIndex: 'leader',
                key: 'leader',
                render: (r) => (r ? '是' : '否'),
            },
        ];
        const permissions = JSON.parse(sessionStorage.getItem('userInfo'));
        const menu = (
            <Menu>
                <Menu.Item
                    onClick={() => {
                        this.props.dispatch({
                            type: 'app/getUserInfos',
                            payload: {},
                            cb: (data) => {
                                this.setState({
                                    userInfoData: data,
                                    userInfo: true,
                                });
                            },
                        });
                    }}
                >
                    <span rel="noopener noreferrer">个人信息</span>
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        this.setState({ passWord: true });
                    }}
                >
                    <span rel="noopener noreferrer">修改密码</span>
                </Menu.Item>
                <Menu.Item onClick={this.loginOut}>
                    <span rel="noopener noreferrer">注销</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header style={{ background: '#FF8336', padding: 0 }}>
                <Row>
                    <Col xxl={2} xl={3}>
                        <div>
                            <img
                                onClick={() => {
                                    history.push({
                                        pathname: '/hiseas_micro_research',
                                    });
                                }}
                                style={{ marginLeft: 5, cursor: 'pointer' }}
                                src={require('./../assets/img/bk/logo.png')}
                                alt=""
                            />
                        </div>
                    </Col>
                    <Col xxl={18} xl={16}>
                        <div
                            style={{
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                display: 'inline-block',
                            }}
                            onClick={() => {
                                history.push({
                                    pathname: '/micro_frontend_template',
                                });
                                return false;

                                const token = sessionStorage.getItem(
                                    'Authorization',
                                );
                                let crmHref = document.body.getAttribute(
                                    'envCrmHref',
                                );
                                if (!crmHref)
                                    crmHref = `https://crm-fat-adm.local.hiseas.com?Authorization=${token}`;
                                // if (!crmHref) crmHref = `http://192.168.21.171:8001/hiseas_micro_crm_admin?Authorization=${token}`;
                                else
                                    crmHref =
                                        crmHref + `?Authorization=${token}`;
                                window.open(crmHref);
                            }}
                        >
                            <img
                                src={require('./../assets/img/bk/CRMlogo.png')}
                            />
                        </div>
                    </Col>
                    <Col xxl={4} xl={5}>
                        <Row justify="end">
                            <Col span={6}>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                    className={Styles.badge}
                                >
                                    <Badge
                                        count={0}
                                        style={{
                                            background: '#fff',
                                            color: '#ff8336',
                                        }}
                                    >
                                        <BellOutlined
                                            style={{
                                                fontSize: '22px',
                                                color: '#fff',
                                                verticalAlign: 'middle',
                                            }}
                                        />
                                    </Badge>
                                </div>
                            </Col>
                            <Col span={1}></Col>
                            <Col
                                span={13}
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <span>
                                    <Dropdown overlay={menu}>
                                        <a
                                            className="ant-dropdown-link"
                                            href="#"
                                        >
                                            <Avatar
                                                src={permissions?.headerImg}
                                            >
                                                {permissions?.nameCn?.slice(
                                                    0,
                                                    1,
                                                )}
                                            </Avatar>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    paddingLeft: '8px',
                                                    width: '105px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: '#fff',
                                                }}
                                            >
                                                {permissions?.nameCn}
                                            </span>
                                            <CaretDownOutlined
                                                style={{
                                                    color: '#fff',
                                                    fontSize: '12px',
                                                }}
                                            />
                                        </a>
                                    </Dropdown>
                                </span>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.passWord}
                    title="修改密码"
                    onCancel={() => {
                        this.setState({ passWord: false });
                        this.formRef.current.resetFields();
                    }}
                    onOk={this.changePwd}
                >
                    <Form
                        preserve={false}
                        ref={this.formRef}
                        name="control-ref"
                    >
                        <Form.Item
                            name="oldPwd"
                            label="原密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入原密码',
                                },
                                { max: 18, message: '最大长度为18个字符' },
                                { min: 6, message: '不能小于6个字符' },
                            ]}
                        >
                            <Input maxLength={18} type="password" />
                        </Form.Item>
                        <Form.Item
                            name="newPwd"
                            label="新密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码',
                                },
                                { max: 18, message: '最大长度为18个字符' },
                                { min: 6, message: '不能小于6个字符' },
                            ]}
                        >
                            <Input maxLength={18} type="password" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.userInfo}
                    title="个人信息"
                    onCancel={() => this.setState({ userInfo: false })}
                    onOk={this.setuserInfo}
                >
                    <div>
                        账号： <Input disabled value={userInfoData.accountNo} />
                    </div>
                    <div>
                        中文名： <Input disabled value={userInfoData.nameCn} />
                    </div>
                    <div>
                        英文名： <Input disabled value={userInfoData.nameEn} />
                    </div>
                    <div>
                        角色：{' '}
                        <Input
                            disabled
                            value={userInfoData?.roles?.map(
                                (it) => it.roleName,
                            )}
                        />
                    </div>
                    <div>
                        部门/岗位：
                        <Table
                            rowKey={(_, i) => i}
                            dataSource={userInfoData.organizations}
                            columns={columns}
                        />
                    </div>
                    <Form
                        preserve={false}
                        ref={this.formRef2}
                        name="control-ref"
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label="邮箱"
                            initialValue={userInfoData.email}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱地址',
                                },
                            ]}
                        >
                            <Input maxLength={256} />
                        </Form.Item>
                        <Form.Item
                            name="phoneNo"
                            label="手机号"
                            initialValue={userInfoData.phoneNo}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                                {
                                    pattern: /^[0-9]*$/,
                                    message: '请输入正确的电话号码',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Header>
        );
    }
}
export default connect(({ app }) => ({ app }))(Head);
