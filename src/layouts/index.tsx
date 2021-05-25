import { Layout, ConfigProvider } from 'antd';
import * as Sentry from '@sentry/react';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { connect } from 'umi';
import Page404 from '@/pages/404';
import Menus from './menu';
import Head from './head';
import Footer from './footer';
// import Breadcrumbs from './breadcrumbs';
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
    if (openPages && openPages.includes(pathname)) {
        return (
            <ConfigProvider locale={zhCN}>
                <Spin />
                {children}
            </ConfigProvider>
        );
    }
    const { ruleList, permissions } = JSON.parse(
        sessionStorage.getItem('userInfo'),
    );
    const pathList = ruleList
        .map((it) => {
            return it.pathList;
        })
        .flat();
    return (
        <Sentry.ErrorBoundary fallback={'An error has occurred'}>
            {/* <button onClick={methodDoesNotExist}>Break the world</button> */}
            <ConfigProvider locale={zhCN}>
                <Spin />
                <Layout style={{ minHeight: '100vh' }}>
                    <Menus
                        location={location}
                        ruleList={ruleList}
                        permissions={permissions}
                    />
                    <Layout>
                        <Head />
                        <br />
                        <Content style={{ margin: '0 16px' }}>
                            {/* <Breadcrumbs /> */}
                            <div
                                style={{
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: 360,
                                }}
                            >
                                {pathList.indexOf(pathname) === -1 &&
                                permissions !== 'admin' ? (
                                    <Page404 index={pathList[0]} />
                                ) : (
                                    children
                                )}
                            </div>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </ConfigProvider>
        </Sentry.ErrorBoundary>
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
