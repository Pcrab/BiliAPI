import { fetchGet, type Response } from "../utils";

const accountInfoUrl = "https://api.bilibili.com/x/member/web/account";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E8%8E%B7%E5%8F%96%E6%88%91%E7%9A%84%E4%BF%A1%E6%81%AF | 文档}
 */
type AccountInfoResponse = Response<{
    /**
     * 我的 mid
     */
    mid: number;
    /**
     * 我的昵称
     */
    uname: string;
    /**
     * 我的用户名
     */
    userid: string;
    /**
     * 我的签名
     */
    sign: string;
    /**
     * 我的生日
     *
     * 格式为 `YYYY-MM-DD`
     */
    birthday: string;
    /**
     * 我的性别
     *
     * `男` 或 `女` 或 `保密`
     */
    sex: "保密" | "女" | "男";
    /**
     * 是否未设置昵称
     *
     * `false` 设置过昵称
     * `true` 未设置昵称
     */
    nick_free: boolean;
    /**
     * 我的会员等级
     *
     * @example "正式会员"
     */
    rank: string;
}>;

/**
 * 获取我的信息
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E8%8E%B7%E5%8F%96%E6%88%91%E7%9A%84%E4%BF%A1%E6%81%AF | 文档}
 */
const accountInfo = async (): Promise<AccountInfoResponse> => {
    const response = await fetchGet<AccountInfoResponse>(accountInfoUrl, {
        withCookie: true,
    });
    return response;
};

const rewardStatusUrl = "https://api.bilibili.com/x/member/web/exp/reward";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E6%AF%8F%E6%97%A5%E5%A5%96%E5%8A%B1%E7%8A%B6%E6%80%81 | 文档}
 */
type RewardStatusResponse = Response<{
    /**
     * 每日登录
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 完成 +5 经验
     */
    login: boolean;
    /**
     * 每日观看
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 完成 +5 经验
     */
    watch: boolean;
    /**
     * 每日投币所奖励的经验
     *
     * 上限为 50 经验，且更新存在延迟
     *
     * {@link | 专用API }
     *
     */
    coins: number;
    /**
     * 每日分享
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 完成 +5 经验
     */
    share: boolean;
    /**
     * 绑定邮箱
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 首次绑定 +20 经验
     */
    email: boolean;
    /**
     * 绑定手机号
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 首次绑定 +100 经验
     */
    tel: boolean;
    /**
     * 设置密保问题
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 首次设置 +30 经验
     */
    safe_question: boolean;
    /**
     * 实名认证
     *
     * `false` 未完成
     * `true` 已完成
     *
     * 首次认证 +50 经验
     */
    identify_card: boolean;
}>;

/**
 * 查询每日奖励状态
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E6%AF%8F%E6%97%A5%E5%A5%96%E5%8A%B1%E7%8A%B6%E6%80%81 | 文档}
 */
const rewardStatus = async (): Promise<RewardStatusResponse> => {
    const response = await fetchGet<RewardStatusResponse>(rewardStatusUrl, {
        withCookie: true,
    });
    return response;
};

const accountExpUrl = "https://www.bilibili.com/plus/account/exp.php";

interface AccountExpResponse {
    code: number;
    message: string;
    number: number;
}

const accountExp = async (): Promise<AccountExpResponse> => {
    const response = await fetchGet<AccountExpResponse>(accountExpUrl, {
        withCookie: true,
    });
    return response;
};

export type { AccountInfoResponse, RewardStatusResponse, AccountExpResponse };
export { accountInfo, rewardStatus, accountExp };
