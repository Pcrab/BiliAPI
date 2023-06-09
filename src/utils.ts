let SESSDATA = "";
let BILI_JCT = "";
let DedeUserID = "";
let DedeUserID__ckMd5 = "";
let Mid = 0;

const setSessdata = (sessdata: string): void => {
    SESSDATA = sessdata;
};

const getSessdata = (): string => {
    return SESSDATA;
};

const setBiliJct = (biliJct: string): void => {
    BILI_JCT = biliJct;
};

const getBiliJct = (): string => {
    return BILI_JCT;
};

const setDedeUserID = (dedeUserID: string): void => {
    DedeUserID = dedeUserID;
};

const getDedeUserID = (): string => {
    return DedeUserID;
};

const setDedeUserID__ckMd5 = (dedeUserID__ckMd5: string): void => {
    DedeUserID__ckMd5 = dedeUserID__ckMd5;
};

const getDedeUserID__ckMd5 = (): string => {
    return DedeUserID__ckMd5;
};

const setMid = (mid: number): void => {
    Mid = mid;
};

const getMid = (): number => {
    return Mid;
};

const logined = (): boolean => {
    return SESSDATA !== "" && BILI_JCT !== "" && DedeUserID !== "" && DedeUserID__ckMd5 !== "";
};

const cookies = (): string => {
    return `SESSDATA=${SESSDATA}; bili_jct=${BILI_JCT}; DedeUserID=${DedeUserID}; DedeUserID__ckMd5=${DedeUserID__ckMd5}`;
};

interface Response<T> {
    code: number;
    message: string;
    data: T;
}

const pureFetch = async <T>(
    url: string,
    opts: {
        method: "GET" | "POST";
        body?: BodyInit;
        params?: Record<string, boolean | number | string> | undefined;
        withCookie?: boolean;
    },
): Promise<T> => {
    if (opts.withCookie && !logined()) throw new Error("not logined");
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(opts.params ?? {})) {
        params.append(key, value.toString());
    }
    const response = await fetch(`${url}?${params.toString()}`, {
        method: opts.method,
        mode: "cors",
        body: opts.body && opts.method === "POST" ? opts.body : null,
        headers: {
            cookie: cookies(),
        },
    });
    const result = (await response.json()) as T;
    return result;
};

const fetchGet = async <T>(
    url: string,
    opts: {
        params?: Record<string, boolean | number | string>;
        withCookie?: boolean;
    } = {},
): Promise<T> => {
    return pureFetch(url, {
        method: "GET",
        ...opts,
    });
};

const fetchPost = async <T>(
    url: string,
    opts: {
        body?: BodyInit;
        withCookie?: boolean;
    } = {},
): Promise<T> => {
    return pureFetch(url, {
        method: "POST",
        ...opts,
    });
};

const sleep = async (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export type { Response };
export {
    setSessdata,
    getSessdata,
    setBiliJct,
    getBiliJct,
    setDedeUserID,
    getDedeUserID,
    setDedeUserID__ckMd5,
    getDedeUserID__ckMd5,
    setMid,
    getMid,
    logined,
    fetchGet,
    fetchPost,
    sleep,
};
