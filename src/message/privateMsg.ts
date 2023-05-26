import type { Response } from "../utils";
import { fetchGet, fetchPost, getBiliJct, getMid } from "../utils";

const unreadSingleUrl = "https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E6%9C%AA%E8%AF%BB%E7%A7%81%E4%BF%A1%E6%95%B0 | 文档 }
 */
type UnreadSingleResponse = Response<{
    /**
     * 未关注用户未读私信数
     */
    unfollow_unread: number;
    /**
     * 已关注用户未读私信数
     */
    follow_unread: number;
    gt: number;
}>;

/**
 * 未读私信数
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E6%9C%AA%E8%AF%BB%E7%A7%81%E4%BF%A1%E6%95%B0 | 文档 }
 */
const unreadSingle = async (): Promise<UnreadSingleResponse> => {
    const response = await fetchGet<UnreadSingleResponse>(unreadSingleUrl, {
        withCookie: true,
    });
    return response;
};

const sendMsgUrl = "https://api.vc.bilibili.com/web_im/v1/web_im/send_msg";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E5%8F%91%E9%80%81%E7%A7%81%E4%BF%A1web%E7%AB%AF | 文档 }
 */
type SendMsgResponse = Response<{
    /**
     * 消息唯一 id
     */
    msg_key: number;
    /**
     * 发送的消息
     */
    msg_content?: string;
    key_hit_infos?: Record<string, never>;
    _gt_?: number;
}>;

/**
 * 发送私信（web端）
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E5%8F%91%E9%80%81%E7%A7%81%E4%BF%A1web%E7%AB%AF | 文档 }
 */
const sendMsg = async (
    /**
     * 接收者 mid
     */
    receiverId: number | string,
    /**
     * 消息具体信息
     */
    msg:
        | {
              /**
               * 消息类型：图片消息
               */
              type: 2;
              /**
               * 图片信息
               */
              img: {
                  /**
                   * 图片地址
                   *
                   * 默认 B 站相簿上传通道，也可以是第三方图床
                   */
                  url: string;
                  /**
                   * 图片宽度
                   *
                   * 单位：px
                   */
                  width?: number;
                  /**
                   * 图片高度
                   *
                   * 单位：px
                   */
                  height?: number;
                  /**
                   * 图片格式
                   */
                  type?: string;
                  original?: 1;
                  /**
                   * 文件大小
                   *
                   * 向上取整，单位：千字节
                   */
                  size?: number;
              };
          }
        | {
              /**
               * 消息类型：撤回消息
               */
              type: 5;
              /**
               * 消息唯一 id
               */
              msgKey: string;
          }
        | {
              /**
               * 消息类型：文本消息
               */
              type: 1;
              /**
               * 文本内容
               */
              text: string;
          },
): Promise<SendMsgResponse> => {
    const senderUid = getMid();
    if (senderUid === 0) {
        throw new Error("mid is required to be set first");
    }
    let content = "";
    switch (msg.type) {
        case 1:
            content = JSON.stringify({ content: msg.text });
            break;
        case 2:
            content = JSON.stringify(msg.img);
            break;
        case 5:
            content = msg.msgKey.toString();
            break;
        default:
            throw new Error(`Type is not supported`);
    }

    const deviceid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (name) {
        const randomInt = (16 * Math.random()) | 0;
        return ("x" === name ? randomInt : (3 & randomInt) | 8).toString(16).toUpperCase();
    });

    const formData = new FormData();
    formData.append("msg[sender_uid]", senderUid.toString());
    formData.append("msg[receiver_id]", receiverId.toString());
    formData.append("msg[receiver_type]", "1");

    formData.append("msg[msg_type]", msg.type.toString());

    formData.append("msg[msg_status]", "0");

    formData.append("msg[dev_id]", deviceid);
    formData.append("msg[timestamp]", Date.now().toString());
    formData.append("msg[content]", content);

    formData.append("csrf", getBiliJct());

    const response = await fetchPost<SendMsgResponse>(sendMsgUrl, {
        withCookie: true,
        body: formData,
    });
    return response;
};

const sessionMsgsUrl = "https://api.vc.bilibili.com/svr_sync/v1/svr_sync/fetch_session_msgs";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E7%A7%81%E4%BF%A1%E6%B6%88%E6%81%AF%E8%AE%B0%E5%BD%95 | 文档 }
 */
type SessionMsgsResponse = Response<{
    messages:
        | {
              /**
               * 发送者 uid
               */
              sender_uid: number;
              /**
               * 与 session_type 对应
               *
               * `1` 用户
               * `2` 粉丝团
               */
              receiver_type: 1 | 2;
              /**
               * 接收者 uid
               */
              receiver_id: number;
              /**
               * 消息类型
               *
               * `1` 文本消息
               * `2` 图片消息
               * `5` 撤回的消息
               * `12`,`13` 通知
               */
              msg_type: 1 | 2 | 5 | 12 | 13;
              /**
               * 消息内容
               */
              content: string;
              msg_seqno: number;
              /**
               * 消息发送时间戳
               */
              timestamp: number;
              at_uids: unknown[];
              /**
               * 消息唯一 id
               */
              msg_key: number;
              msg_status: number;
              notify_code: string;
              new_face_version?: number;
          }[]
        | null;
    has_more: number;
    min_seqno: number;
    max_seqno: number;
    e_infos?: {
        text: string;
        uri: string;
        size: number;
    }[];
}>;

/**
 * 私信消息记录
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/message/private_msg.md#%E7%A7%81%E4%BF%A1%E6%B6%88%E6%81%AF%E8%AE%B0%E5%BD%95 | 文档 }
 */
const sessionMsgs = async (opts: {
    /**
     * 可选参数，发送者设备
     */
    sender_device_id?: number;
    /**
     * 聊天对象 UID
     *
     * @example mid1234567 => 1234567
     * @example fans1234567 => 1234567
     */
    talker_id: number;
    /**
     * 聊天对象的类型
     *
     * `1` 用户（mid）
     * `2` 粉丝团（fans）
     */
    session_type: 1 | 2;
    /**
     * 列出消息条数
     *
     * 默认 `20`
     */
    size?: number;
    build?: number;
    mobi_app?: string;
}): Promise<SessionMsgsResponse> => {
    const response = await fetchGet<SessionMsgsResponse>(sessionMsgsUrl, {
        withCookie: true,
        params: opts,
    });
    return response;
};

export type { UnreadSingleResponse, SendMsgResponse, SessionMsgsResponse };
export { unreadSingle, sendMsg, sessionMsgs };
