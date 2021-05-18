/**
     * @desc 退出
退出
     */

import pontFetch from '@/fetch';

export class Params {
    userId: string;
}

export class Resp {
    /** TOKEN */
    url: string;
}

export async function request(params: Params) {
    return pontFetch('/logout', {
        params,
        method: 'get',
    });
}
