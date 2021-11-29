import { connect } from 'umi';
import { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import _ from 'lodash';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.css';

const FormItem = Form.Item;

const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
};
const tailLayout2 = {
    wrapperCol: { offset: 16, span: 8 },
};

const body = window.document.getElementsByTagName('body');
const envApiPrefix = body[0].getAttribute('envApiPrefix');
if (envApiPrefix) {
    window.envApiPrefix = envApiPrefix;
} else {
    window.envApiPrefix = 'http://dev-adm-api.local.hiseas.com';
}

const Login = ({ login, loading, dispatch }) => {
    const [form] = Form.useForm();
    const [count, setCount] = useState(_.random(1000000, 9999999));
    const [isShowYzm, changeIsShowYzm] = useState(
        eval(localStorage.getItem('isShowYzm')),
    );

    useEffect(() => {
        let account = localStorage.getItem('account');
        if (account) {
            account = JSON.parse(account);
            form.setFieldsValue(account);
        }
    }, []);

    const handleSubmit = (values) => {
        isShowYzm ? (values.randomStr = count) : '';
        dispatch({
            type: 'login/login',
            payload: values,
            cb: (data) => {
                changeIsShowYzm(data);
                refCaptcha();
            },
        });
    };
    const refCaptcha = () => {
        setCount(() => _.random(1000000, 9999999));
    };
    return (
        <div className={styles.bk}>
            <div className={styles.form}>
                <Form
                    onFinish={handleSubmit}
                    className="login-form"
                    form={form}
                >
                    <div className={styles.title}>欢迎登录研学服务平台</div>
                    <FormItem
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            size="large"
                            addonBefore={<UserOutlined />}
                            placeholder="请输入用户名"
                            autoComplete="off"
                        />
                    </FormItem>
                    <FormItem
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            size="large"
                            addonBefore={<LockOutlined />}
                            type="password"
                            placeholder="请输入用户密码"
                            maxLength={18}
                        />
                    </FormItem>
                    {isShowYzm ? (
                        <>
                            <FormItem
                                name="verificationCode"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码!',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="验证码"
                                    autoComplete="off"
                                />
                            </FormItem>
                            <FormItem>
                                <img
                                    src={`${window.envApiPrefix}/admin/api/auth/image/captcha?randomStr=${count}`}
                                    alt="验证码"
                                />
                                <Button
                                    className={styles.refensBtn}
                                    onClick={refCaptcha}
                                    size="large"
                                >
                                    刷新
                                </Button>
                            </FormItem>
                        </>
                    ) : (
                        ''
                    )}

                    <FormItem>
                        <Button
                            size="large"
                            block
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登录
                        </Button>
                    </FormItem>
                    <Form.Item>
                        <Form.Item
                            noStyle
                            {...tailLayout}
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>下次自动登录</Checkbox>
                        </Form.Item>

                        <span href="" style={{ float: 'right' }}>
                            忘记密码？
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
    login: PropTypes.object,
};
export default connect(({ loading, login }) => ({ loading, login }))(Login);
