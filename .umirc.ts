import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    analyze: {
        analyzerMode: 'static',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
    dynamicImport: {},
    chunks: ['umi', 'base', 'vendors', 'lodash'],
    chainWebpack: function (config, { webpack }) {
        config.merge({
            optimization: {
                splitChunks: {
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        base: {
                            chunks: 'all',
                            minSize: 0,
                            minChunks: 1,
                            name: 'base',
                            test: /react|dva|qiankun|redux/,
                            priority: 10,
                        },
                        lodash: {
                            chunks: 'all',
                            minSize: 0,
                            minChunks: 1,
                            name: 'lodash',
                            test: /lodash/,
                            priority: 10,
                        },
                        vendors: {
                            chunks: 'all',
                            minSize: 30000,
                            minChunks: 2,
                            name: 'vendors',
                            test: /node_modules/,
                            priority: 0,
                        },
                    },
                },
            },
        });
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
    proxy: {
        '/sentry': {
            target: 'http://sentry.local.yohitrip.com/', //fat
            changeOrigin: true,
            pathRewrite: { '^/sentry': '' },
        },
    },
});
