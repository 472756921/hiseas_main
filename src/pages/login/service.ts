import { baseInterface } from '@/api';
const { login } = baseInterface;

export function getlogin(data: baseInterface.login.login.Params): any {
    return login.login.request({
        data: data,
        loading: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    });
}
