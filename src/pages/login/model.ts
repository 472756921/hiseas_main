import { getlogin } from './service';
import { history } from 'umi';

export default {
    namespace: 'login',
    state: {
        user: '',
    },
    subscriptions: {},
    effects: {
        *login({ payload }, { put, call, select }) {
            const { data } = yield call(getlogin, payload);
            if (data) {
                sessionStorage.setItem(
                    'Authorization',
                    data ? JSON.stringify(data?.Authorization) : '',
                );
                sessionStorage.setItem(
                    'userInfo',
                    data ? JSON.stringify(data) : '',
                );
                const indexPath = data.ruleList[0].permissions;
                history.push('/' + indexPath);
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
