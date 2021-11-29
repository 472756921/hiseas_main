import { getUserInfos, changePwd, updateUserInfo } from './service';
import { history } from 'umi';

export default {
    namespace: 'app',
    state: {
        user: '',
    },
    subscriptions: {},
    effects: {
        *clearpermissions({ payload, cb }, { put, call, select }) {
            yield put({ type: 'save', payload: { permissions: [] } });
            if (cb) cb();
        },
        *getUserInfos({ payload, cb }, { put, call, select }) {
            const { code, data } = yield call(getUserInfos, payload);
            if (code === '200' && cb) {
                cb(data);
            }
        },
        *updateUserInfo({ payload, cb }, { put, call, select }) {
            const { code, data } = yield call(updateUserInfo, payload);
            if (code === '200' && cb) {
                cb(data);
            }
        },
        *changePwd({ payload, cb }, { put, call, select }) {
            const { code, data } = yield call(changePwd, payload);
            if (code === '200' && cb) {
                cb(data);
            }
        },
    },
    reducers: {
        loginScuess(state, { payload }) {
            return {
                ...state,
                user: payload.data,
            };
        },
    },
};
