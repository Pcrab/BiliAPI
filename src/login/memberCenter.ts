import { fetchGet, fetchPost, getBiliJct, type Response } from "../utils";

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
     * {@link accountExp | 专用API }
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

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E6%AF%8F%E6%97%A5%E6%8A%95%E5%B8%81%E8%8E%B7%E5%BE%97%E7%BB%8F%E9%AA%8C%E6%95%B0 | 文档}
 */
interface AccountExpResponse {
    code: number;
    message: string;
    /**
     * 每日投币所奖励的经验，上限为 50
     */
    number: number;
}

/**
 * 查询每日投币获得经验数
 *
 * 不存在更新延迟
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E6%AF%8F%E6%97%A5%E6%8A%95%E5%B8%81%E8%8E%B7%E5%BE%97%E7%BB%8F%E9%AA%8C%E6%95%B0 | 文档}
 */
const accountExp = async (): Promise<AccountExpResponse> => {
    const response = await fetchGet<AccountExpResponse>(accountExpUrl, {
        withCookie: true,
    });
    return response;
};

const vipInfoUrl = "https://api.bilibili.com/x/vip/web/user/info";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E5%A4%A7%E4%BC%9A%E5%91%98%E7%8A%B6%E6%80%81 | 文档}
 */
type VipInfoResponse = Response<{
    /**
     * 我的 mid
     */
    mid: number;
    /**
     * 大会员类型
     *
     * `0` 无
     * `1` 月度
     * `2` 年度及以上
     */
    vip_type: 0 | 1 | 2;
    /**
     * 大会员状态
     *
     * `1` 正常
     *
     * `2` 由于IP地址更换过于频繁,服务被冻结
     *
     * `3` 你的大会员账号风险过高，大会员功能已被锁定
     */
    vip_status: 1 | 2 | 3;
    /**
     * 大会员到期时间
     *
     * 时间戳，单位为毫秒
     */
    vip_due_date: number;
    /**
     * 是否已购买大会员
     *
     * `0` 未购买
     * `1` 已购买
     */
    vip_pay_type: number;
    theme_type: number;
}>;

/**
 * 查询大会员状态
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E5%A4%A7%E4%BC%9A%E5%91%98%E7%8A%B6%E6%80%81 | 文档}
 */
const vipInfo = async (): Promise<VipInfoResponse> => {
    const response = await fetchGet<VipInfoResponse>(vipInfoUrl, {
        withCookie: true,
    });
    return response;
};

const safetyInfoUrl = "https://passport.bilibili.com/web/site/user/info";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E8%B4%A6%E5%8F%B7%E5%AE%89%E5%85%A8%E6%83%85%E5%86%B5 | 文档}
 */
type SafetyInfoResponse = Response<{
    /**
     * 账号绑定信息
     */
    account_info: {
        /**
         * 绑定的手机号，星号隐藏部分信息
         */
        hide_tel: string;
        /**
         * 绑定的邮箱，星号隐藏部分信息
         */
        hide_mail: string;
        /**
         * 是否绑定手机号
         *
         * `false` 未绑定
         * `true` 已绑定
         */
        bind_tel: boolean;
        /**
         * 是否绑定邮箱
         *
         * `false` 未绑定
         * `true` 已绑定
         */
        bind_mail: boolean;
        /**
         * 是否验证手机号
         *
         * `false` 未验证
         * `true` 已验证
         */
        tel_verify: boolean;
        /**
         * 是否验证邮箱
         *
         * `false` 未验证
         * `true` 已验证
         */
        mail_verify: boolean;
        /**
         * 是否***未设置***密码
         *
         * `false` 已设置
         * `true` 未设置
         */
        unneeded_check: boolean;
        /**
         * 是否实名认证
         *
         * `false` 未认证
         * `true` 已认证
         */
        realname_certified: boolean;
    };
    /**
     * 密码安全信息
     */
    account_safe: {
        /**
         * 账号安全等级，已弃用？
         *
         * 0 - 100
         *
         * @deprecated
         */
        Score: number;
        /**
         * 新版账号安全等级
         *
         * 0 - 100
         */
        score_new: number;
        /**
         * 当前密码强度等级
         *
         * `1` 弱
         *
         * `2` 中
         *
         * `3` 强
         */
        pwd_level: 1 | 2 | 3;
        /**
         * 当前密码是否安全
         *
         * `false` 不安全
         * `true` 安全
         */
        security: boolean;
    };
    /**
     * 互联登录绑定信息
     */
    account_sns: {
        /**
         * 是否绑定微博
         *
         * `0` 未绑定
         * `1` 已绑定
         */
        weibo_bind: 0 | 1;
        /**
         * 是否绑定 QQ
         *
         * `0` 未绑定
         * `1` 已绑定
         */
        qq_bind: 0 | 1;
        /**
         * 是否绑定微信
         *
         * `0` 未绑定
         * `1` 已绑定
         */
        wechat_bind: 0 | 1;
    };
    account_other: {
        skipVerify: boolean;
    };
}>;

/**
 * 查询账号安全情况
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E8%B4%A6%E5%8F%B7%E5%AE%89%E5%85%A8%E6%83%85%E5%86%B5 | 文档}
 */
const safetyInfo = async (): Promise<SafetyInfoResponse> => {
    const response = await fetchGet<SafetyInfoResponse>(safetyInfoUrl, {
        withCookie: true,
    });
    return response;
};

const realnameStatusUrl = "https://api.bilibili.com/x/member/realname/status";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E8%B4%A6%E5%8F%B7%E5%AE%9E%E5%90%8D%E8%AE%A4%E8%AF%81%E7%8A%B6%E6%80%81 | 文档}
 */
type RealnameStatusResponse = Response<{
    /**
     * 实名认证状态
     *
     * `0` 未认证
     * `1` 已认证
     */
    status: number;
}>;

/**
 * 查询账号实名认证状态
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E8%B4%A6%E5%8F%B7%E5%AE%9E%E5%90%8D%E8%AE%A4%E8%AF%81%E7%8A%B6%E6%80%81 | 文档}
 */
const realnameStatus = async (): Promise<RealnameStatusResponse> => {
    const response = await fetchGet<RealnameStatusResponse>(realnameStatusUrl, {
        withCookie: true,
    });
    return response;
};

const realnameInfoUrl = "https://api.bilibili.com/x/member/realname/apply/status";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E5%AE%9E%E5%90%8D%E8%AE%A4%E8%AF%81%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF | 文档}
 */
type RealnameInfoResponse = Response<{
    /**
     * 认证状态
     *
     * `1` 已认证
     * `3` 未认证
     */
    status: 1 | 3;
    /**
     * 驳回信息
     *
     * 默认为空
     */
    remark: string;
    /**
     * 实名姓名
     *
     * 星号隐藏完全信息
     */
    realname: string;
    /**
     * 证件号码
     *
     * 星号隐藏部分信息
     */
    card: string;
    /**
     * 证件类型代码
     *
     * `0` 身份证
     *
     * `2` 港澳居民来往内地通行证
     *
     * `3` 台湾居民来往内地通行证
     *
     * `4` 护照（中国签发）
     *
     * `5` 外国人永久居留证
     *
     * `6` 其他国家或地区身份证明
     */
    card_type: 0 | 2 | 3 | 4 | 5 | 6;
}>;

/**
 * 查询实名认证详细信息
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E5%AE%9E%E5%90%8D%E8%AE%A4%E8%AF%81%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF | 文档}
 */
const realnameInfo = async (): Promise<RealnameInfoResponse> => {
    const response = await fetchGet<RealnameInfoResponse>(realnameInfoUrl, {
        withCookie: true,
    });
    return response;
};

const coinLogUrl = "https://api.bilibili.com/x/member/web/coin/log";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E7%A1%AC%E5%B8%81%E5%8F%98%E5%8C%96%E6%83%85%E5%86%B5 | 文档}
 */
type CoinLogResponse = Response<{
    /**
     * 变化记录条目列表
     */
    list: {
        /**
         * 变化时间
         *
         * 格式为 `YYYY-MM-DD HH:mm:ss`
         */
        time: string;
        /**
         * 变化量
         *
         * 正值为收入，负值为支出
         */
        delta: number;
        /**
         * 变化说明
         */
        reason: string;
    }[];
    /**
     * 变化记录条目数
     */
    count: number;
}>;

/**
 * 查询硬币变化情况
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E6%9F%A5%E8%AF%A2%E7%A1%AC%E5%B8%81%E5%8F%98%E5%8C%96%E6%83%85%E5%86%B5 | 文档}
 */
const coinLog = async (): Promise<CoinLogResponse> => {
    const response = await fetchGet<CoinLogResponse>(coinLogUrl, {
        withCookie: true,
    });
    return response;
};

const updateSignUrl = "https://api.bilibili.com/x/member/web/sign/update";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E4%BF%AE%E6%94%B9%E4%B8%AA%E4%BA%BA%E7%AD%BE%E5%90%8D | 文档}
 */
interface UpdateSignResponse {
    /**
     * 返回值
     *
     * `0` 成功
     *
     * `-101` 账号未登录
     *
     * `-111` csrf 校验失败
     *
     * `40015` 签名包含敏感词
     *
     * `40021` 签名不能包含图片
     *
     * `40022` 签名过长
     */
    code: -101 | -111 | 0 | 40015 | 40021 | 40022;
    message: string;
}

/**
 * 修改个人签名
 *
 * @param user_sign 新的个人签名，最多支持 70 个字符，删除签名不用传入此参数或传入空字符串
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/member_center.md#%E4%BF%AE%E6%94%B9%E4%B8%AA%E4%BA%BA%E7%AD%BE%E5%90%8D | 文档}
 */
const updateSign = async (user_sign = ""): Promise<UpdateSignResponse> => {
    const csrf = getBiliJct();
    const formData = new FormData();
    formData.append("csrf", csrf);
    formData.append("user_sign", user_sign);
    const response = await fetchPost<UpdateSignResponse>(updateSignUrl, {
        withCookie: true,
        body: formData,
    });
    return response;
};

export type {
    AccountInfoResponse,
    RewardStatusResponse,
    AccountExpResponse,
    VipInfoResponse,
    SafetyInfoResponse,
    RealnameStatusResponse,
    RealnameInfoResponse,
    CoinLogResponse,
    UpdateSignResponse,
};
export {
    accountInfo,
    rewardStatus,
    accountExp,
    vipInfo,
    safetyInfo,
    realnameStatus,
    realnameInfo,
    coinLog,
    updateSign,
};
