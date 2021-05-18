import { getlogin } from './service';
import { history } from 'umi';

export default {
  namespace: 'app',
  state: {
    user: '',
  },
  subscriptions: {},
  effects: {},
  reducers: {
    loginScuess(state, { payload }) {
      return {
        ...state,
        user: payload.data,
      };
    },
  },
};
