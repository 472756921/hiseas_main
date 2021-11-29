import '@/api';
import { registerMicroApps, start } from 'qiankun';

window.test = 123;

registerMicroApps([
    {
        name: 'CRM', // app name registered
        entry: 'http://localhost:8003',
        container: '#mainroot',
        activeRule: '/micro_frontend_template',
    },
    {
        name: 'ERP',
        entry: 'https://fat-adm.local.hiseas.com',
        container: '#mainroot',
        activeRule: '/hiseas_micro_research',
    },
]);

start({
    prefetch: false,
    singular: true,
    fetch: window.fetch,
    sandbox: { strictStyleIsolation: true },
    excludeAssetFilter: (assetUrl) => {
        const whiteList = [];
        const whiteWords = ['baidu', 'map', 'mapopen'];
        if (whiteList.includes(assetUrl)) {
            return true;
        }
        return whiteWords.some((w) => {
            return assetUrl.includes(w);
        });
    },
});
