import { fetchGet, type Response } from "../utils";

const unreadUrl = "https://api.bilibili.com/x/msgfeed/unread";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/msg.md#%E6%9C%AA%E8%AF%BB%E6%B6%88%E6%81%AF%E6%95%B0 | 文档 }
 */
type UnreadResponse = Response<{
    /**
     * 未读 at 数
     */
    at: number;
    chat: number;
    /**
     * 未读点赞数
     */
    like: number;
    /**
     * 未读回复数
     */
    reply: number;
    /**
     * 未读系统通知数
     */
    sys_msg: number;
    /**
     * UP 主助手信息数
     */
    up: number;
}>;

/**
 * 未读消息数
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/msg.md#%E6%9C%AA%E8%AF%BB%E6%B6%88%E6%81%AF%E6%95%B0 | 文档 }
 */
const unread = async (): Promise<UnreadResponse> => {
    const response = await fetchGet<UnreadResponse>(unreadUrl, {
        withCookie: true,
    });
    return response;
};

export type { UnreadResponse };
export { unread };
