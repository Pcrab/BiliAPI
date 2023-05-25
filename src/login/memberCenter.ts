import { fetchGet, type Response } from "../utils";

const accountInfoUrl = "https://api.bilibili.com/x/member/web/account";

interface AccountInfoResponse extends Response {
    data: {
        mid: number;
        uname: string;
        userid: string;
        sign: string;
        birthday: string;
        sex: string;
        nick_free: boolean;
        rank: string;
    };
}

const accountInfo = async (): Promise<AccountInfoResponse> => {
    const response = await fetchGet<AccountInfoResponse>(accountInfoUrl, {
        withCookie: true,
    });
    return response;
};

export type { AccountInfoResponse };
export { accountInfo };
