/**
 * @desc 图片验证码
 */

import pontFetch from '@/fetch';

export class Params {
    v: string;
}

export class Resp {
    /** TOKEN */
    url: string;
}

export async function request(params: Params) {
    return pontFetch('/captcha', {
        params,
        method: 'get',
    });
}
