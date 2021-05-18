import { cloneDeep, isEmpty as isEmptyL } from 'lodash';

/**
 * @method 扁平结构数据树形结构输出
 * @param data {Array} 必须是数组，且包含 parentId, name, id 同名属性
 * @param pid {String} 第一级 Pid，根据最高级parentId设置
 * @param pname {String} 第一级 pname，根据最高级name设置
 * @return {Array} 集合
 */
export const createTree = (data, pid, pname) => {
    if (
        Object.prototype.toString.call(data) != '[object Array]' ||
        data.length < 0
    ) {
        return [];
    }
    const result = [];
    let temp;
    for (const i in data) {
        if (data[i].parentId === pid) {
            if (pname) {
                data[i].pname = pname;
            }
            result.push(data[i]);
            temp = createTree(data, data[i].id, data[i].name);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
};
/**
 * @method 树形结构数据扁平输出
 * @param data {Array} 必须是数组，必须包含 id 属性
 * @param pid {String} 顶层 PID（默认为 '0'）
 * @return {Array} 集合
 */
export const createBP = (data, pid = '0') => {
    if (
        Object.prototype.toString.call(data) != '[object Array]' ||
        data.length < 0
    ) {
        return [];
    }
    const result = [];
    let temp, temp2;
    for (const i in data) {
        temp = JSON.parse(JSON.stringify(data[i]));

        if (data[i].children) {
            delete temp['children'];
            temp2 = createBP(data[i].children, data[i].id);
            result.push(...temp2);
        }
        data[i].pid = pid;
        result.push(data[i]);
    }
    return result;
};
/**
 * @method 将数组以 checkGroup 形式输出
 * @param data {Array} 必须是数组，且包含 id, value 同名属性
 * @return {Array} checkGroup 集合
 */
export const createCheckItem = (data) => {
    if (
        Object.prototype.toString.call(data) != '[object Array]' ||
        data.length < 0
    ) {
        return [];
    }
    return data.map((it) => {
        return { label: it.value, value: it.id };
    });
};

/**
 * @method 判断 数组，对象，字符串是否为 "null" null '' undefind
 * @param data {Array|Object|String}
 * @return {Boolean}
 */

export const isEmpty = (data) => {
    if (
        Object.prototype.toString.call(data) !== '[object Array]' &&
        typeof data !== 'object'
    ) {
        if (
            data === undefined ||
            data === null ||
            data === 'null' ||
            data === ''
        ) {
            return true;
        }
        return false;
    }

    return isEmptyL(data);
};

export const DeepClone = (obj) => {
    return cloneDeep(obj);
};

export const isNumber = (data) => {
    if (Number(data)) {
        return true;
    }
    return false;
};
