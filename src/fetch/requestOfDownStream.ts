import { fetch } from 'dva';
import { message } from 'antd';
import qs from 'qs';
import { showLoading, hideLoading } from '../layouts/spin';
import { apiPreff } from '../config/system';

const JSONS = { 'Content-type': 'application/json;charset=UTF-8' };

function parseBlob(response) {
    return response.blob();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    message.error('网络似乎开小差了，请稍后再试');
    throw error;
}
function checkResp(blob) {
    if ('msSaveOrOpenBlob' in navigator) {
        // Microsoft Edge and Microsoft Internet Explorer 10-11
        window.navigator.msSaveOrOpenBlob(blob, '下载.xls');
        return blob;
    }
    const url = window.URL.createObjectURL(blob);
    const name = '下载.xls';
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(a.href);
    return blob;
}

function createParmas(url, data) {
    let sendUrl = url;
    let i = 0;
    for (const it in data) {
        if (data[it] === undefined || data[it] === '') {
            continue;
        }
        if (i === 0) {
            sendUrl += '?' + it + '=' + data[it];
        } else {
            sendUrl += '&' + it + '=' + data[it];
        }
        i++;
    }
    return sendUrl;
}

function paramCr(data, url) {
    return createParmas(url, data);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
    options.url = apiPreff + options.url;
    if (!options.headers) {
        options.headers = JSONS;
    }
    if (options.url.indexOf('/login') === -1) {
        options.headers['Authorization'] = sessionStorage.getItem(
            'Authorization',
        );
    }
    options.credentials = 'include'; //携带cookie

    if (options.method.toUpperCase() === 'GET' && options.params) {
        options.url = paramCr(options.params, options.url);
    } else {
        if (options.body) {
            if (
                options.headers['Content-type'] !==
                'application/json;charset=UTF-8'
            ) {
                options.body = qs.stringify(options.body);
            } else {
                options.body = JSON.stringify(options.body);
            }
        }
    }
    if (options.loading) {
        showLoading();
    }
    return fetch(options.url, options)
        .then(checkStatus)
        .then(parseBlob)
        .then(checkResp)
        .catch((err) => {
            if (err.response) {
                err.response.json().then((v) => {
                    message.error(v.msg);
                });
            }
            if (options.loading) {
                hideLoading();
            }
            return err;
        })
        .finally(() => {
            if (options.loading) {
                hideLoading();
            }
        });
}
