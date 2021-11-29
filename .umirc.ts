import { defineConfig } from 'umi';
import theme from './theme.js';

export default defineConfig({
    title: '研学后台管理系统',
    favicon: '/favicon.ico',
    theme: theme,
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    mountElementId: 'mainroot',
    analyze: {
        analyzerMode: 'static',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
    routes: [
        {
            path: '/',
            component: '@/layouts/index',
            routes: [
                {
                    path: '/',
                    component: '@/pages/index',
                },
                { path: '/login', component: '@/pages/login/index' },
                { path: '/404', component: '@/pages/404' },
            ],
        },
    ],
    proxy: {
        '/apilocal': {
            target: 'https://fat-adm-api.local.hiseas.com/',
            // target: 'https://dev-adm-api.local.hiseas.com/',
            changeOrigin: true,
            pathRewrite: { '^/apilocal': '' },
        },
        '/sentry': {
            target: 'http://sentry.local.yohitrip.com/', //fat
            changeOrigin: true,
            pathRewrite: { '^/sentry': '' },
        },
    },
});
