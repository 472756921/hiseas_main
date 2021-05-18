import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    routes: [
        {
            path: '/',
            component: '@/layouts/index',
            routes: [
                {
                    path: '/',
                    component: '@/pages/index',
                },
                {
                    path: '/CRM',
                    microApp: 'CRM',
                },
                { path: '/login', component: '@/pages/login/index' },
                { path: '/404', component: '@/pages/404' },
            ],
        },
    ],
    qiankun: {
        master: {
            apps: [
                {
                    name: 'CRM',
                    entry: '//localhost:8001',
                },
            ],
        },
    },
});
