import { Layout, ConfigProvider } from 'antd';
// import * as Sentry from '@sentry/react';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { connect } from 'umi';
import { Link } from 'react-router-dom';
import Page404 from '@/pages/404';
import Menus from './menu';
import { menus } from '../config/menu';
import Head from './head';
import Footer from './footer';
import { openPages } from '../config/system';
import PropTypes from 'prop-types';
import { withRouter } from 'umi';
import { history } from 'umi';
import Spin from './spin';

const { Content } = Layout;

const App = ({ children, location, dispatch }) => {
    const token = sessionStorage.getItem('Authorization');
    const { pathname } = location;

    if (token === null && pathname !== '/login' && pathname !== '/404') {
        history.push('/login');
        return null;
    }
    const isNot404 = menus.filter((it) => it.path.indexOf(pathname) !== -1)
        .length;

    if (!isNot404 && pathname !== '/login') {
        return (
            <ConfigProvider locale={zhCN}>
                <Page404 />
            </ConfigProvider>
        );
    }
    if (openPages && openPages.includes(pathname)) {
        return (
            <ConfigProvider locale={zhCN}>
                <Spin />
                {children}
            </ConfigProvider>
        );
    }

    return (
        <ConfigProvider locale={zhCN}>
            <Spin />
            <Layout style={{ minHeight: '100vh' }}>
                <Head />
                <Layout>
                    <Content>
                        <div
                            id="con"
                            style={{
                                background: '#fff',
                                minHeight: '100%',
                                height: '100%',
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    app: PropTypes.object,
};

export default withRouter(
    connect(({ app, loading }) => ({ app, loading }))(App),
);
