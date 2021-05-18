export const menus = [
    {
        id: '1',
        title: '首页',
        icon: 'home',
        rootType: '1',
        show: true,
        path: '/',
    },
    {
        id: '2',
        title: 'CRM',
        path: '/crm',
        icon: 'setting',
        rootType: '1',
        show: true,
        children: [
            {
                id: '2-1',
                title: '客户管理',
                path: '/crm/curlist',
                icon: 'unordered-list',
                show: true,
                children: [
                    {
                        id: '2-1-1',
                        title: '客户列表',
                        path: '/crm/curlist/info',
                        icon: 'unordered-list',
                        show: true,
                    },
                    {
                        id: '2-1-2',
                        title: '客户列表2',
                        path: '/crm/curlist/info2',
                        icon: 'unordered-list',
                        show: true,
                    },
                ],
            },
        ],
    },
];
