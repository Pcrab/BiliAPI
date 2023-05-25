import { setSessdata, type Response, setBiliJct, sleep, setDedeUserID, setDedeUserID__ckMd5 } from "../../utils";
import qrcode from "qrcode-terminal";

const generateQrCodeUrl = "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_action/QR.md#web%E7%AB%AF%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95 | 文档}
 */
type GenerateQrcodeResponse = Response & {
    message: string;
    ttl: number;
    data: {
        /**
         * 二维码内容（登陆页面 url）
         *
         * 将字段内容转换为二维码使用 app 扫码
         */
        url: string;
        /**
         * 扫码登录密钥
         *
         * 恒为 32 字符
         */
        qrcode_key: string;
    };
};

/**
 * 申请二维码
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_action/QR.md#web%E7%AB%AF%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95 | 文档}
 */
const generateQrCode = async (): Promise<GenerateQrcodeResponse> => {
    const response = await fetch(generateQrCodeUrl);
    const result = (await response.json()) as GenerateQrcodeResponse;
    qrcode.generate(result.data.url, { small: true });
    return result;
};

const pollQrcodeUrl = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";

/**
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_action/QR.md#%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95web%E7%AB%AF | 文档}
 */
type PollQrcodeResponse = Response & {
    message: string;
    data: {
        /**
         * 登录页面 url
         */
        url: string;
        /**
         * 刷新 token
         */
        refresh_token: string;
        /**
         * 登陆时间戳
         *
         * 未登录时为 `0`，单位为毫秒
         */
        timestamp: number;
        /**
         * 登录状态码
         *
         * - `0` 登录成功
         * - `86038` 二维码已失效
         * - `86090` 二维码已扫码，等待确认
         * - `86101` 未扫码
         */
        code: 0 | 86038 | 86090 | 86101;
        /**
         * 扫码状态信息
         */
        message: string;
    };
};

/**
 * 扫码登录
 *
 * ---
 *
 * {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/login/login_action/QR.md#%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95web%E7%AB%AF | 文档}
 */
const pollQrcode = async (qrcodeKey: string): Promise<PollQrcodeResponse> => {
    const response = await fetch(`${pollQrcodeUrl}?qrcode_key=${qrcodeKey}`);
    const result = (await response.json()) as PollQrcodeResponse;
    // login not success
    if (result.data.code !== 0) return result;

    // login success, write SESSDATA and bili_jct
    const url = new URL(result.data.url);
    url.searchParams.forEach((value, key) => {
        switch (key) {
            case "SESSDATA":
                setSessdata(encodeURIComponent(value));
                break;
            case "bili_jct":
                setBiliJct(value);
                break;
            case "DedeUserID":
                setDedeUserID(value);
                break;
            case "DedeUserID__ckMd5":
                setDedeUserID__ckMd5(value);
                break;
            default:
                break;
        }
    });
    return result;
};

const loginWithQrcode = async (): Promise<void> => {
    let succeeded = false;
    let qrcodeKey = "";

    const refreshQrcode = async (): Promise<void> => {
        if (!succeeded) {
            const generateQrcodeResponse = await generateQrCode();
            qrcodeKey = generateQrcodeResponse.data.qrcode_key;
        }
    };

    let interval = setInterval(() => void refreshQrcode(), 180 * 1000);
    await refreshQrcode();
    while (true) {
        await sleep(3000);
        const pollQrcodeResponse = await pollQrcode(qrcodeKey);
        switch (pollQrcodeResponse.data.code) {
            case 0:
                console.log("登录成功");
                succeeded = true;
                clearInterval(interval);
                return;
            case 86038:
                console.log("二维码已失效");
                clearInterval(interval);
                interval = setInterval(() => void refreshQrcode(), 180 * 1000);
                break;
            case 86090:
                console.log("二维码已扫码，等待确认");
                break;
            case 86101:
                console.log("未扫码");
                break;
            default:
                console.log("未知错误");
                clearInterval(interval);
                return;
        }
    }
};

export type { GenerateQrcodeResponse, PollQrcodeResponse };
export { generateQrCode, pollQrcode, loginWithQrcode };
