import { connect } from 'umi';
import { useState } from 'react';
import { Button, Icon, Form, Input } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { name, apiPreff } from '@/config/system';
import styles from './index.css';

const FormItem = Form.Item;

const Login = ({ login, loading, dispatch }) => {
    const [count, setCount] = useState(_.random(1000000, 9999999));
    const handleSubmit = (values) => {
        dispatch({ type: 'login/login', payload: values });
    };
    const refCaptcha = () => {
        setCount(() => _.random(1000000, 9999999));
    };
    return (
        <div className={styles.bk}>
            <div className={styles.form}>
                <Form onFinish={handleSubmit} className="login-form">
                    <div className={styles.title}>{name}</div>
                    <FormItem
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Username"
                            autoComplete="off"
                        />
                    </FormItem>
                    <FormItem
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </FormItem>{' '}
                    <FormItem
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <Input
                            prefix={
                                <Icon
                                    type="tool"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="验证码"
                            autoComplete="off"
                        />
                    </FormItem>
                    <FormItem>
                        <img src="" alt="验证码" />
                        <Button
                            className={styles.refensBtn}
                            onClick={refCaptcha}
                        >
                            刷新
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登录
                        </Button>
                    </FormItem>
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
