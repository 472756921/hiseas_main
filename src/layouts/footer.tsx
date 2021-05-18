import { Component } from 'react';
import { Layout } from 'antd';
import { footerText } from '../config/system';

const { Footer } = Layout;

export default class SiderDemo extends Component {
    render() {
        return <Footer style={{ textAlign: 'center' }}>{footerText}</Footer>;
    }
}
