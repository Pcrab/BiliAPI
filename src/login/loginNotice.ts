import { fetchGet, getMid, type Response } from "../utils";

const loginNoticeUrl = "https://api.bilibili.com/x/safecenter/login_notice";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_notice.md#%E6%9F%A5%E8%AF%A2%E7%99%BB%E5%BD%95%E8%AE%B0%E5%BD%95 | 文档 }
 */
type LoginNoticeResponse = Response<{
    /**
     * 登录用户 mid
     */
    mid: number;
    /**
     * 依靠操作登录接口时的 UA 决定
     */
    device_name: string;
    login_type: string;
    login_time: string;
    location: string;
    ip: string;
}>;

/**
 * 查询登录记录
 *
 * 查询前首先需要设置用户 mid
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_notice.md#%E6%9F%A5%E8%AF%A2%E7%99%BB%E5%BD%95%E8%AE%B0%E5%BD%95 | 文档 }
 */
const loginNotice = async (): Promise<LoginNoticeResponse> => {
    const mid = getMid();
    if (mid === 0) {
        throw new Error("mid is required to be set first");
    }
    const response = await fetchGet<LoginNoticeResponse>(loginNoticeUrl, {
        withCookie: true,
        params: {
            mid,
        },
    });
    return response;
};

export type { LoginNoticeResponse };
export { loginNotice };
