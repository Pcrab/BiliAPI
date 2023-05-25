import { setSessdata, type Response, setBiliJct, sleep } from "../../utils";
import qrcode from "qrcode-terminal";

const generateQrCodeUrl = "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";

type GenerateQrcodeResponse = Response & {
    message: string;
    ttl: number;
    data: {
        url: string;
        qrcode_key: string;
    };
};

const generateQrCode = async (): Promise<GenerateQrcodeResponse> => {
    const response = await fetch(generateQrCodeUrl);
    const result = (await response.json()) as GenerateQrcodeResponse;
    qrcode.generate(result.data.url, { small: true });
    return result;
};

const pollQrcodeUrl = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";

type PollQrcodeResponse = Response & {
    message: string;
    data: {
        url: string;
        refresh_token: string;
        timestamp: number;
        code: 0 | 86038 | 86090 | 86101;
        message: string;
    };
};

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
