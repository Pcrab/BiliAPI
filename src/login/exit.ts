import { fetchPost, getBiliJct } from "../utils";

const exitUrl = "https://passport.bilibili.com/login/exit/v2";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/exit.md#%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95web%E7%AB%AF | 文档}
 */
interface ExitResponse {
    /**
     * 返回值
     *
     * `0` 成功
     * `2202` csrf 请求非法
     */
    code: number;
    /**
     * 返回值
     *
     * `true` 成功
     */
    status: boolean;
    /**
     * 时间戳
     */
    ts: number;
    /**
     * 错误信息
     *
     * 成功时不存在
     */
    message?: string;
    /**
     * 消息
     *
     * 失败时不存在
     */
    data?: {
        /**
         * 重定向 url
         */
        redirectUrl: string;
    };
}

/**
 * 退出登录（web端）
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/exit.md#%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95web%E7%AB%AF | 文档}
 */
const exit = async (): Promise<ExitResponse> => {
    const body = new FormData();
    body.append("biliCSRF", getBiliJct());
    const response = await fetchPost<ExitResponse>(exitUrl, {
        withCookie: true,
        body,
    });
    return response;
};

export type { ExitResponse };
export { exit };
