import { useState } from 'react';
import { Spin } from 'antd';
import Styles from './index.css';

export let showLoading;
export let hideLoading;
export default function Loading() {
    const [count, setCount] = useState(0);
    showLoading = () => setCount((count) => count + 1);
    hideLoading = () =>
        setCount((count) => {
            const newCount = count - 1;
            return newCount > 0 ? newCount : 0;
        });
    if (!count) {
        return null;
    }
    return (
        <div className={Styles.spinContent}>
            <Spin className={Styles.spin} tip="Loading..." />
        </div>
    );
}
