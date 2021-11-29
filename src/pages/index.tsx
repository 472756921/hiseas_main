import styles from './index.less';
import { useEffect } from 'react';

export default function IndexPage(props) {
    useEffect(() => {
        const {
            path,
            center = { lat: 39.92, lng: 116.46 },
            markers = [
                { title: '无名地', position: { lat: 39.92, lng: 116.46 } },
            ],
            defaultZoom = 12,
        } = props;
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Page index in main</h1>
        </div>
    );
}
