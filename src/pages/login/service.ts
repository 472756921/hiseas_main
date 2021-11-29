import fetch from '@/fetch';

const getlogin = (params: any) => {
    return window.API.baseInterface.login.login.request(params);
};

const getUserAc = (params) => {
    return fetch('/user/getUserPerms', {
        method: 'GET',
        params: params,
    });
};

export { getlogin, getUserAc };
