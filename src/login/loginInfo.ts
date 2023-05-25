import { fetchGet, type Response } from "../utils";

const navUserInfoUrl = "https://api.bilibili.com/nav";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E5%AF%BC%E8%88%AA%E6%A0%8F%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF | 文档}
 */
interface NavUserInfoResponse extends Response {
    data: {
        /**
         * 是否已登陆
         *
         * `false` 未登陆
         * `true` 已登陆
         */
        isLogin: boolean;
        /**
         * 是否验证邮箱地址
         *
         * `0` 未验证
         * `1` 已验证
         */
        email_verified: 0 | 1;
        /**
         * 用户头像 url
         */
        face: string;
        /**
         * 等级信息
         */
        level_info: {
            /**
             * 当前等级
             */
            current_level: number;
            /**
             * 当前等级经验最低值
             */
            current_min: number;
            /**
             * 当前经验
             */
            current_exp: number;
            /**
             * 升级下一等级需要达到的经验
             *
             * 当用户等级为Lv6时为 `--` 代表无穷大
             */
            next_exp: number | "--";
        };
        /**
         * 用户 mid
         */
        mid: number;
        /**
         * 是否验证手机号
         *
         * `0` 未验证
         * `1` 已验证
         */
        mobile_verified: 0 | 1;
        /**
         * 拥有硬币数
         */
        money: number;
        /**
         * 当前节操值
         *
         * 上限为 70
         */
        moral: number;
        /**
         * 认证信息
         */
        official: {
            /**
             * 认证类型
             *
             * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/user/official_role.md | 用户认证类型一览}
             */
            role: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
            /**
             * 认证信息
             *
             * 认证类型为 无 时为空
             */
            title: string;
            /**
             * 认证备注
             *
             * 认证类型为 无 时为空
             */
            desc: string;
            /**
             * 是否认证
             *
             * `-1` 无
             * `0` 认证
             */
            type: -1 | 0;
        };
        /**
         * 认证信息 2
         */
        officialVerify: {
            /**
             * 是否认证
             *
             * `-1` 无
             * `0` 认证
             */
            type: -1 | 0;
            /**
             * 认证信息
             *
             * 认证类型为 无 时为空
             */
            desc: string;
        };
        /**
         * 头像框信息
         */
        pendant: {
            /**
             * 挂件 id
             */
            pid: number;
            /**
             * 挂件名称
             */
            name: string;
            /**
             * 挂件图片 url
             */
            image: string;
            expire: number;
        };
        scores: number;
        /**
         * 用户昵称
         */
        uname: string;
        /**
         * 会员到期时间
         *
         * 毫秒时间戳
         */
        vipDueDate: number;
        /**
         * 会员开通状态
         *
         * `0` 未开通
         * `1` 已开通
         */
        vipStatus: 0 | 1;
        /**
         * 会员类型
         *
         * `0` 无
         * `1` 月度大会员
         * `2` 年度及以上大会员
         */
        vipType: 0 | 1 | 2;
        /**
         * 会员开通状态
         *
         * `0` 未开通
         * `1` 已开通
         */
        vip_pay_type: 0 | 1;
        vip_tyeme_type: number;
        /**
         * 会员标签
         */
        vip_label: {
            path: string;
            /**
             * 会员名称
             */
            text: string;
            /**
             * 会员标签
             *
             * `aannual_vip` 年度大会员
             * `hundred_annual_vip` 百年大会员
             * `ten_annual_vip` 十年大会员
             * `vip` 大会员
             */
            label_theme: "aannual_vip" | "hundred_annual_vip" | "ten_annual_vip" | "vip";
        };
        /**
         * 是否显示会员图标
         *
         * `0` 不显示
         * `1` 显示
         */
        vip_avatar_subscript: 0 | 1;
        /**
         * 会员昵称颜色
         *
         * 颜色码
         */
        vip_nickname_color: string;
        /**
         * B 币钱包信息
         */
        wallet: {
            /**
             * 登录用户 mid
             */
            mid: number;
            /**
             * 拥有 B 币数
             */
            bcoin_balance: number;
            /**
             * 每月奖励 B 币数
             */
            coupon_balance: number;
            coupon_due_time: number;
        };
        /**
         * 是否拥有推广商品
         *
         * `false` 无
         * `true` 有
         */
        has_shop: boolean;
        /**
         * 商品推广页面 url
         */
        shop_url: string;
        allowance_count: number;
        answer_status: number;
        /**
         * 是否硬核会员
         *
         * `0` 非硬核会员
         * `1` 硬核会员
         */
        is_senior_member: 0 | 1;
        /**
         * Wbi 签名实时口令
         *
         * 即使用户未登录也存在
         */
        wbi_img: {
            /**
             * Wbi 签名参数 `imgKey` 的伪装 utl
             *
             * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md | Wbi 签名}
             */
            img_url: string;
            /**
             * Wbi 签名参数 `subUrl` 的伪装 utl
             *
             * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md | Wbi 签名}
             */
            sub_url: string;
        };
        is_jury: boolean;
    };
}

/**
 * 导航栏用户信息
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E5%AF%BC%E8%88%AA%E6%A0%8F%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF | 文档}
 */
const navUserInfo = async (): Promise<NavUserInfoResponse> => {
    const response = await fetchGet<NavUserInfoResponse>(navUserInfoUrl, {
        withCookie: true,
    });
    return response;
};

const userStatUrl = "https://api.bilibili.com/x/web-interface/nav/stat";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E7%99%BB%E5%BD%95%E7%94%A8%E6%88%B7%E7%8A%B6%E6%80%81%E6%95%B0%E5%8F%8C%E7%AB%AF | 文档}
 */
interface UserStatResponse extends Response {
    data: {
        /**
         * 关注数
         */
        following: number;
        /**
         * 粉丝数
         */
        follower: number;
        /**
         * 发布动态数
         */
        dynamic_count: number;
    };
}

/**
 * 登录用户状态数（双端）
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E7%99%BB%E5%BD%95%E7%94%A8%E6%88%B7%E7%8A%B6%E6%80%81%E6%95%B0%E5%8F%8C%E7%AB%AF | 文档}
 */
const userStat = async (): Promise<UserStatResponse> => {
    const response = await fetchGet<UserStatResponse>(userStatUrl, {
        withCookie: true,
    });
    return response;
};

const getCoinUrl = "https://account.bilibili.com/site/getCoin";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E8%8E%B7%E5%8F%96%E7%A1%AC%E5%B8%81%E6%95%B0 | 文档}
 */
interface GetCoinResponse extends Response {
    data: {
        /**
         * 当前硬币数
         *
         * 硬币为正数时为 `number`，为 0 时为 `null`
         */
        money: number | null;
    };
}

/**
 * 获取硬币数
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_info.md#%E8%8E%B7%E5%8F%96%E7%A1%AC%E5%B8%81%E6%95%B0 | 文档}
 */
const getCoin = async (): Promise<GetCoinResponse> => {
    const response = await fetchGet<GetCoinResponse>(getCoinUrl, {
        withCookie: true,
    });
    return response;
};

export type { NavUserInfoResponse, UserStatResponse, GetCoinResponse };
export { navUserInfo, userStat, getCoin };
