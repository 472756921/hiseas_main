import { getlogin, getUserAc } from './service';
import { history } from 'umi';
import { message } from 'antd';

export default {
    namespace: 'login',
    state: {
        user: '',
    },
    subscriptions: {},
    effects: {
        *login({ payload, cb }, { put, call, select }) {
            const { data, code, msg } = yield call(getlogin, payload);

            if (code != 200) {
                localStorage.setItem('isShowYzm', true);
                cb(true);
                return false;
            }

            if (data && code === '200') {
                if (data.userVO.status !== 'ENABLE') {
                    message.error('账号被禁用');
                    return false;
                }

                localStorage.removeItem('account');
                if (payload.remember) {
                    localStorage.setItem(
                        'account',
                        JSON.stringify({
                            username: payload.username,
                            password: payload.password,
                            remember: true,
                        }),
                    );
                }

                sessionStorage.setItem(
                    'Authorization',
                    data ? data?.token : '',
                );
                sessionStorage.setItem(
                    'userInfo',
                    data ? JSON.stringify(data?.userVO) : '',
                );
                localStorage.setItem('isShowYzm', false);

                const qx = yield call(getUserAc, {
                    projectId: 1,
                    userId: data.userVO.id,
                });
                sessionStorage.setItem('permissions', JSON.stringify(qx.data));
                yield put({
                    type: 'app/save',
                    payload: { permissions: qx.data },
                });
                history.push('/');
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
