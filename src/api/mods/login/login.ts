/**
 * @desc 登录
 * 返回jwt token
 */

import pontFetch from '@/fetch';

export class Params {
    /** 验证码 */
    captcha: string;
    /** 用户密码 */
    password: string;
    /** 用户名 */
    username: string;
}
export class Resp {
    /** TOKEN */
    token: string;
}

export async function request(params: Params) {
    return pontFetch('/auth/login', {
        method: 'POST',
        data: params,
    });
}
