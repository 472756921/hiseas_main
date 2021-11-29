import fetch from '@/fetch';

export function getUserInfos(params): any {
    return fetch('/user/current', {
        method: 'GET',
        params: params,
    });
}
export function updateUserInfo(params): any {
    return fetch('/user/basic/modify', {
        method: 'POST',
        data: params,
    });
}
export function changePwd(params): any {
    return fetch('/user/password/modify', {
        method: 'POST',
        data: params,
    });
}
