let SESSDATA = "";
let BILI_JCT = "";
let DedeUserID = "";
let DedeUserID__ckMd5 = "";

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

const logined = (): boolean => {
    return SESSDATA !== "" && BILI_JCT !== "" && DedeUserID !== "" && DedeUserID__ckMd5 !== "";
};

const cookies = (): string => {
    return `SESSDATA=${SESSDATA}; bili_jct=${BILI_JCT}; DedeUserID=${DedeUserID}; DedeUserID__ckMd5=${DedeUserID__ckMd5}`;
};

interface Response {
    code: number;
    message: string;
}

const pureFetch = async <T extends Response>(
    url: string,
    opts: {
        method: "GET" | "POST";
        body?: Record<string, boolean | number | string> | undefined;
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
        body: opts.body && opts.method === "POST" ? JSON.stringify(opts.body) : null,
        headers: {
            cookie: cookies(),
        },
    });
    const result = (await response.json()) as T;
    return result;
};

const fetchGet = async <T extends Response>(
    url: string,
    opts: {
        params?: Record<string, boolean | number | string>;
        withCookie?: boolean;
    },
): Promise<T> => {
    return pureFetch(url, {
        method: "GET",
        ...opts,
    });
};

const fetchPost = async <T extends Response>(
    url: string,
    opts: {
        body?: Record<string, boolean | number | string>;
        withCookie?: boolean;
    },
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
    logined,
    fetchGet,
    fetchPost,
    sleep,
};
