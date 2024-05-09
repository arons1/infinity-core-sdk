import retry from 'async-retry';

const WAIT_BETWEEN_CALLS = 500;
const TIMEOUT = 10000;
type RequestParameters = {
    headers?: any;
    url: string;
    no_wait: boolean;
    timeout: number;
    params?: any;
    retries?: number;
};
const requestCall = ({
    headers = {},
    url,
    no_wait,
    timeout,
}: RequestParameters) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                fetch(url, {
                    signal: controller.signal,
                    method: 'get',
                    headers: {
                        ...headers,
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
                    },
                })
                    .then(async a => {
                        const body = await a.text();
                        try {
                            resolve(JSON.parse(body));
                        } catch (e) {
                            resolve({ error: true, aborted: true });
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        clearTimeout(id);
                        if (e.type == 'abort' || e.type == 'invalid-json') {
                            resolve({ error: true, aborted: true });
                        } else {
                            reject({ error: true });
                        }
                    });
            },
            no_wait ? 0 : WAIT_BETWEEN_CALLS,
        );
    });
};
const requestGet = async (props: RequestParameters) =>
    await retry(() => requestCall(props), { retries: props.retries ?? 3 });

const requestPostCall = ({
    headers = {},
    url,
    no_wait,
    params,
    timeout,
}: RequestParameters) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                let formBody: string;
                const realHeaders = headers;
                if (
                    headers != undefined &&
                    headers['Content-Type'] != undefined &&
                    headers['Content-Type']
                        ?.toLowerCase()
                        ?.includes('x-www-form-urlencoded')
                ) {
                    formBody = new URLSearchParams(params).toString();
                } else if (
                    headers != undefined &&
                    headers['Content-Type'] != undefined &&
                    headers['Content-Type']
                        ?.toLowerCase()
                        ?.includes('text/plain')
                ) {
                    formBody = params;
                } else {
                    realHeaders['Content-Type'] = 'application/json';
                    formBody = JSON.stringify(params);
                }

                fetch(url, {
                    body: formBody,
                    method: 'POST',
                    signal: controller.signal,
                    headers: {
                        ...realHeaders,
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
                    },
                })
                    .then(async a => {
                        const body = await a.text();
                        try {
                            resolve(JSON.parse(body));
                        } catch (e) {
                            resolve({ error: true, aborted: true });
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        clearTimeout(id);
                        if (e.type == 'abort' || e.type == 'invalid-json') {
                            resolve({ error: true, aborted: true });
                        } else {
                            reject({ error: true });
                        }
                    });
            },
            no_wait ? 0 : WAIT_BETWEEN_CALLS,
        );
    });
};
const requestPost = async (props: RequestParameters) =>
    await retry(() => requestPostCall(props), { retries: props.retries ?? 3 });

export const request = {
    post: requestPost,
    get: requestGet,
};
