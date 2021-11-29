import request, { RequestMethod } from 'umi-request';
import { history } from 'umi';
import qs from 'qs';
import { notification, message } from 'antd';
import { apiPreff, proxyPreff } from '../config/system';
import { showLoading, hideLoading } from '@/layouts/spin';

interface reqOptions {
    timeout?: number;
    prefix?: string;
    credentials?: string;
    getResponse?: boolean;
}

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
const defaultheaders = { 'Content-Type': 'application/json;charset=UTF-8' };
const errorHandler = (error) => {
    const {
        response = {},
        data = { msg: '服务器发生错误，请检查服务器。' },
    } = error;
    const { status, url } = response;
    const errortext = data.msg || codeMessage[status] || response.statusText;
    if (status === 401) {
        history.push('/login');
    }
    console.log('object :>> ', `请求错误 ${status}: ${url}`);
    throw Error('请求失效');
    // notification.error({
    //     message: `请求错误 ${status}: ${url}`,
    //     description: errortext,
    // });
    return {};
};
const defaultOptions = {
    timeout: 6000,
    prefix: proxyPreff + apiPreff,
    credentials: 'include',
    errorHandler: errorHandler,
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "umi-request"
 * @return {Promist}           An object containing either "data" or "err"
 */

export default function UseRequset(
    url: string,
    options: reqOptions,
): RequestMethod {
    options = { ...options, ...defaultOptions };
    options.headers = options.headers || defaultheaders;
    if (url.indexOf('/login') === -1) {
        options.headers['Authorization'] = sessionStorage.getItem(
            'Authorization',
        );
    }
    // -------------------------   produce API config    ------------------------------
    const body = window.document.getElementsByTagName('body');
    const envApiPrefix = body[0].getAttribute('envApiPrefix');
    if (envApiPrefix) {
        options.prefix = envApiPrefix + apiPreff;
    }
    // -------------------------   produce API config    ------------------------------
    options.loading ? showLoading() : '';
    if (options.method.toUpperCase() === 'GET' && options.params) {
        return getFn(url, options);
    }
    if (options.method.toUpperCase() === 'POST' && options.data) {
        return postFn(url, options);
    }
    if (options.method.toUpperCase() === 'DELETE' && options.data) {
        return deleteFn(url, options);
    }
    if (options.method.toUpperCase() === 'PUT' && options.data) {
        return putFn(url, options);
    }
    throw Error('request method list outside');
}

function getFn(url, options) {
    return request
        .get(url, options)
        .then((data) => {
            return reqThen(data, options);
        })
        .finally(() => reqFinally(options));
}
function postFn(url, options) {
    options.data = clearNullData(options.data, options.headers);
    return request
        .post(url, options)
        .then((data) => {
            return reqThen(data, options);
        })
        .finally(() => reqFinally(options));
}
function deleteFn(url, options) {
    options.data = clearNullData(options.data, options.headers);
    return request
        .delete(url, options)
        .then((data) => {
            return reqThen(data, options);
        })
        .finally(() => reqFinally(options));
}
function putFn(url, options) {
    options.data = clearNullData(options.data, options.headers);
    return request
        .put(url, options)
        .then((data) => {
            return reqThen(data, options);
        })
        .finally(() => reqFinally(options));
}
function clearNullData(data, headers) {
    if (data) {
        for (const item in data) {
            data[item] === 'null' ? (data[item] = null) : '';
        }
        if (
            headers['Content-Type'].indexOf(
                'application/x-www-form-urlencoded',
            ) !== -1
        ) {
            data = qs.stringify(data);
        }
        return data;
    }
    return null;
}
function reqFinally(options) {
    options.loading ? hideLoading() : '';
}
function reqThen(data, options) {
    if (data.code && data.code == 200) {
        return data;
    }
    data?.message ? message.warning(data?.message) : '';
    return {};
}
