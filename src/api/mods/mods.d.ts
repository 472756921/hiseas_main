declare namespace defs {
    export class LoginDTO {
        /** 密码(length:50) */
        password?: string;

        /** 请求验证码时的随机字符串 */
        randomStr?: string;

        /** 账号(length:50) */
        username?: string;

        /** 验证码(length:4) */
        verificationCode?: string;
    }
    export class RespResult<T0 = any> {
        /** 状态码 */
        code?: number;

        /** 响应数据 */
        data?: T0;

        /** 返回消息 */
        msg?: string;

        /** 是否成功 */
        success?: boolean;
    }
}

declare namespace API {
    export namespace baseInterface {
        export namespace login {
            export namespace login {
                export class Params {}

                export type Response = defs.RespResult<defs.LoginVO>;

                export const init: Response;

                export function request(
                    params: Params,
                    body: defs.LoginDTO,
                    options?: any,
                ): Promise<Response>;
            }
        }
    }
}
